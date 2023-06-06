const debug = require('debug')
const log = debug('democracyos:db-api:escuela')

const utils = require('lib/utils')
const pluck = utils.pluck

const Escuela = require('lib/models').Escuela

exports.all = function all (fn) {
  log('Looking for all escuelas.')

  Escuela
    .find()
    .sort('nombre')
    .exec(function (err, objs) {
      if (err) {
        log('Found error %j', err)
        return fn(err)
      }

      log('Delivering all escuelas %o', pluck(objs, 'nombre'))
      fn(null, objs)
    })
  return this
}

exports.get = function get (id) {
  log('Looking for Escuela with id %s', id)

  return Escuela
    .findById(id)
    .catch(err => log('Found error %j', err))
    .then(obj => {
      log('Delivering Escuela %j', obj)
      return obj
    })
}

exports.getOne = function getOne (id,fn) {
  log('Looking for Escuela with id %s', id)

  Escuela
    .findById(id)
    .catch(err => log('Found error %j', err))
    .then(obj => {
      log('Delivering Escuela %j', obj)
      fn(null, obj)
    })
}

exports.getArray = function get (idArray) {
  log('Looking for Escuelas with ids %j', idArray)

  return Escuela
    .find({_id: {$in: idArray}})
    .catch(err => log('Found error %j', err))
    .then(objs => {
      log('Delivering Escuelas %j', objs)
      return objs
    })
}

exports.update = function update (id, data, fn) {
  log('Updating escuela %s with %j', id, data)

  exports.getOne(id, onget)

  function onget (err, escuela) {
    if (err) {
      log('Found error %s', err.message)
      return fn(err)
    }

    // update and save escuela document with data
    escuela.set(data)
    escuela.save(onupdate)
  }

  function onupdate (err, escuela) {
    if (!err) {
      log('Saved escuela %s', escuela._id)
      return fn(null, escuela)
    }
    log('Found error %s', err)
    return fn(err)
  }

  return this
}