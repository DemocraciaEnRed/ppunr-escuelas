const debug = require('debug')
const log = debug('democracyos:api:stats')

const express = require('express')
var utils = require('lib/utils')
var restrict = utils.restrict
var staff = utils.staff
var maintenance = utils.maintenance

const dbApi = require('lib/db-api')

const app = module.exports = express.Router()

app.get('/stats',
  restrict,
  staff,
  async function getStats (req, res, next) {
    log('Getting stats')
    let usersNotvalidated = await dbApi.user.getUsersNotEmailValidated()
    let usersNotvalidatedCount = usersNotvalidated.length
    let emailUsersNotValidated = usersNotvalidated.map(user => {
      return {
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        createdAt: user.createdAt,
        claustro: user.claustro ? user.claustro.nombre : '-',
        escuelas: user.escuelas.length ? user.escuelas.map(x => x.abreviacion).join(', ') : '-'
      }
    })
    // send 200
    res.status(200).json({
      stats: {
        users: await dbApi.user.getUsersCount(),
        userNotEmailValidated: usersNotvalidatedCount,
        topics: await dbApi.topic.getCount(),
        likes: await dbApi.topic.sumProyectistasInTopics(),
        attendies: await dbApi.agenda.sumAttendiesInAgenda(),
        comments: await dbApi.topic.getCommentsCount(),
        replies: await dbApi.topic.sumRepliesInComments(),
        emailsNotValidated: emailUsersNotValidated
      }
    })
  }
)

app.get('/stats/votacion',
  restrict,
  staff,
  async function getAllVotes (req, res, next) {
    let votesArray = await dbApi.vote.getVotesVotacionWithEverything()
    req.votesArray = votesArray
    next()
  },
  async function getAllUsersFromVotes (req, res, next) {
    // for every vote.dni get its user
    let dniList = await dbApi.vote.getDistinctDNI()
    let usersArray = await dbApi.user.getAllUsersInDNIArray(dniList)
    let padronArray = await dbApi.padron.getDNIsPadronWithEscuelas(dniList)
    
    // make a map of dni -> user
    let dniUserMap = {}
    let dniPadronMap = {}
    usersArray.forEach((user) => {
      if (user.dni) dniUserMap[user.dni] = user
    })
    padronArray.forEach((padronData) => {
      if (padronData.dni) dniPadronMap[padronData.dni] = padronData
    })
    req.dniList = dniList
    req.dniUserMap = dniUserMap
    req.dniPadronMap = dniPadronMap
    // add user to vote
    // clone votesArray
    // let votesArray = req.votesArray
    req.votesArray.forEach((vote) => {
      if (vote.dni && dniUserMap[vote.dni]) {
        vote.user = dniUserMap[`${vote.dni}`]
      } else {
        vote.user = null
      }
    })
    // req.votesArray = votesArray
    next()
  },
  async function getStats (req, res, next) {
    // console.log(req.votesArray)
    log('Getting stats')
    // send 200
    let votesCount = await dbApi.vote.getCountVotes()   
    let dniList = req.dniList
    let usersWhoDidntVoted = await dbApi.user.getUsersWhoDidntVoted(dniList)
    let usersWhoDidntVotedCount = usersWhoDidntVoted.length
    let escuelas = {}
    let claustros = {}
    let votosPresencial = 0 // if vote.author.dni is different to vote.dni
    let votosOnline = 0 // if vote.author.dni is equal to vote.dni

    // group votes by dni
    let votesByDNI = {}

    req.votesArray.forEach(vote => {
      if (votesByDNI[vote.dni]) {
        votesByDNI[vote.dni].push(vote)
      } else {
        votesByDNI[vote.dni] = [vote]
      }
    })
    
    let votesByDNIKeys = Object.keys(votesByDNI)
    votesByDNIKeys.forEach((dni) => {
      if (votesByDNI[dni][0]) {
        let theVote = votesByDNI[dni][0]
        if (theVote.author.dni !== theVote.dni) {
          votosPresencial++
        } else {
          votosOnline++
        }
        if (req.dniPadronMap[dni] && req.dniPadronMap[dni].escuelas && req.dniPadronMap[dni].escuelas.length) {
          if(req.dniPadronMap[dni].escuelas.length > 1) {
            const arrEscAbreviacion = req.dniPadronMap[dni].escuelas.map(x => x.abreviacion).sort()
            const escAbreviacion = arrEscAbreviacion.join('-')
            if (escuelas[escAbreviacion]) {
              escuelas[escAbreviacion]++
            } else {
              escuelas[escAbreviacion] = 1
            }
          } else {
            if (escuelas[req.dniPadronMap[dni].escuelas[0].abreviacion]) {
              escuelas[req.dniPadronMap[dni].escuelas[0].abreviacion]++
            } else {
              escuelas[req.dniPadronMap[dni].escuelas[0].abreviacion] = 1
            }
          }
        }
        if (theVote.claustro) {
          if (claustros[theVote.claustro.nombre]) {
            claustros[theVote.claustro.nombre]++
          } else {
            claustros[theVote.claustro.nombre] = 1
          }
        } else if (theVote.user && theVote.user.claustro) {
          if (claustros[theVote.user.claustro.nombre]) {
            claustros[theVote.user.claustro.nombre]++
          } else {
            claustros[theVote.user.claustro.nombre] = 1
          }
        }
      }
    })

    console.dir(escuelas)
    console.dir(claustros)
    console.log(votosOnline)
    console.log(votosPresencial)

    res.status(200).json({
      stats: {
        votesCount,
        dniCount: dniList.length,
        // usersWhoDidntVoted,
        usersWhoDidntVotedCount,
        votosPresencial,
        votosOnline,
        escuelas,
        claustros
      }
    })
  }
)
