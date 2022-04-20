const debug = require('debug')
const log = debug('democracyos:api:proyectistas')

const express = require('express')
var utils = require('lib/utils')
var restrict = utils.restrict
var staff = utils.staff
//var maintenance = utils.maintenance
const json2csv = require('json-2-csv').json2csv

const dbApi = require('lib/db-api')

const app = module.exports = express.Router()

function escapeTxt (text) {
  if (!text) return ''
  text += ''
  return text.replace(/"/g, '\'').replace(/\r/g, '').replace(/\n/g, '')
}

app.get('/proyectistas/all/csv',
  restrict,
  staff,
  function getProyectistas(req, res, next) {
    log('Getting proyectistas')

    dbApi.user.getProyectistas().then((proyectistas) => {
      if (proyectistas) {
        log('Serving padron')
        req.proyectistas = proyectistas
        next()
      } else {
        req.proyectistas = []
        return []
      }
    })
  },
  function sendCsv (req, res, next) {
    var infoProyectistas = req.proyectistas.map((u) => {
      return [
        u.firstName,
        u.lastName,
        u.dni,
        u.email,
        u.claustro && u.claustro.nombre ? escapeTxt(u.claustro.nombre) : '??',
        u.escuelas && u.escuelas.nombre ? escapeTxt(u.escuelas.nombre) : '??'
      ]
    })
    var data = [['Nombre', 'Apellido', 'DNI', 'Email', 'Claustro', 'Facultad']]
    data = data.concat(infoProyectistas)
    json2csv(data, function (err, csv) {
      if (err) {
        log('get csv: array to csv error', err)
        return res.status(500).end()
      }
      res.status(200)
      res.set({
        'Content-Encoding': 'UTF-8',
        'Content-Type': 'text/csv; charset=UTF-8',
        'Content-Disposition': `attachment; filename=proyectistas-${Math.floor((new Date()) / 1000)}.csv`
      })
      res.write(csv)
      res.end()
    }, { prependHeader: false, excelBOM: true })
  }
)