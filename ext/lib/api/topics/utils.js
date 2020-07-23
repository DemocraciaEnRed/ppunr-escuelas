const api = require('lib/api-v2/db-api')
const apiV1 = require('lib/db-api')
const topicScopes = require('lib/api-v2/db-api/topics/scopes')
const { notFound } = require('../errors')
const ObjectID = require('mongoose').Types.ObjectId

exports.parseClaustros = (req, res, next) => {
  req.query.claustros = req.query.claustros.split(',').filter((t) => !!t)
  next()
}
exports.parseTags = (req, res, next) => {
  req.query.tags = req.query.tags.split(',').filter((t) => !!t)
  next()
}

exports.parseStates = (req, res, next) => {
  req.query.state = req.query.state.split(',').filter((t) => !!t)
  next()
}

exports.findForum = (req, res, next) => {
  api.forums.find({ name: req.query.forumName })
    .findOne()
    .exec()
    .then((forum) => {
      if (!forum) throw notFound('FORUM_NOT_FOUND')

      req.forum = forum

      next()
    })
    .catch(next)
}

const queryTopics = (opts) => {
  const {
    state,
    forum,
    tags,
    related,
    owners,
    escuela
  } = opts

  const query = {
    forum: forum._id,
    publishedAt: { $ne: null },
    escuela: escuela
  }

  if (owners && owners.length > 0) query.owner = { $in: owners }
  if (tags && tags.length > 0) query.tags = { $in: tags }
  if (state && state.length > 0) query['attrs.state'] = state
  if (related && related.length > 0) query['attrs.admin-comment-referencia'] = { $regex: `.*${related}.*` }

  return api.topics.find().where(query)
}

const getPossibleOwners = (opts) => {
  const {
    claustros,
  } = opts

  const query = {}

  if (claustros && claustros.length > 0) query.claustro = { $in: claustros.map(id => ObjectID(id)) }

  if (Object.keys(query).length > 0)
    return apiV1.user.findIds(query)
  else
    return Promise.resolve(null)
}


const sortMap = {
  barrio: 'attrs.barrio',
  newest: '-createdAt',
  popular: '-action.count'
}

exports.findTopics = (opts) => {
  const {
    forum,
    limit = 30,
    page = 1,
    sort,
    user,
    escuela,
    state
  } = opts
  return getPossibleOwners(opts).then(owners => {
    // si devuelve null es porque no se filtró por owner
    // (porque no se pasaron dichos parámetros en opts)
    if (owners === null || owners.length > 0){
      opts.owners = owners
      return queryTopics(opts)
          .populate(topicScopes.ordinary.populate)
          .sort(sortMap[sort])
          .select(topicScopes.ordinary.select)
          .limit(limit)
          .skip((page - 1) * limit)
          .exec()
    } else
      return []
  }).then((topics) => Promise.all(topics.map((topic) => {
    return topicScopes.ordinary.expose(topic, forum, user)
  })))
}

exports.findTopicsCount = (opts) => getPossibleOwners(opts).then(owners => {
  // si devuelve null es porque no se filtró por owner
  // (porque no se pasaron dichos parámetros en opts)
  if (owners === null || owners.length > 0){
    opts.owners = owners
    return queryTopics(opts).count().exec()
  } else
    return 0
})
