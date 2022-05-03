const debug = require('debug')
const log = debug('democracyos:db-api:padron')

const utils = require('lib/utils')
const pluck = utils.pluck

const ObjectID = require('mongoose').Types.ObjectId
const Padron = require('lib/models').Padron

exports.isInPadron = (opts) => {
  log('Looking padron for %j', opts)

  const { dni, escuela } = opts
  const query = {
    dni,
    escuelas: new ObjectID(escuela)
  }

  // devulve null si no está y el padron entero si sí está
  return Padron.findOne(query).then(padron => {
    if (padron)
      log('Padron found %j', padron)
    else
      log('Padron not found')
    return padron
  })
}

exports.isDNIPadron = (dni) => {
  log('Looking padron for DNI %j', dni)

  const query = {
    dni: dni
  }
  // devulve null si no está y el padron entero si sí está
  return Padron.findOne(query).populate('user').populate('escuelas').then(padron => {
    if (padron)
      log('Padron found %j', padron)
    else
      log('Padron not found')
    return padron
  })
}

exports.updateUserId = (dni, userId) => {
  log('Updating padron dni %s with user %s', dni, userId)

  // devulve null si no está y el padron entero si sí está
  return Padron.findOne({dni: dni}).then(padron => {
    if (!padron)
      throw new Error(`Padron dni ${dni} not found`)
    if (padron.user)
      throw new Error(`Padron dni ${dni} already has a user ${padron.user}`)
    padron.user = new ObjectID(userId)
    padron.save()
    log('Updated padron dni %s with user %s', dni, userId)
    return padron
  })
}

exports.create = function create(data, fn) {
  log('Creating new padron')

  let payload = {
    dni: data.dni,
    escuelas: data.escuelas
  }
  var padron = new Padron(payload)
  padron.save(function (err) {
    if (err) {
      log('Found error: %s', err)
      return fn(err)
    }

    log('Saved padron with dni %s and escuela', data.dni, data.escuela)
    fn(null, data)
  })
}

exports.all = () => {
  log('Getting agenda sorted by datetime')
  return Padron.find({}).populate(['user', 'escuelas'])
}

exports.insertMany = (dataArray) => {
  log('Getting agenda sorted by datetime')
  return Padron.insertMany(dataArray)
}

/*exports.all = function all (fn) {
  log('Looking for all padrones.')

  Padron
    .find()
    .sort('nombre')
    .exec(function (err, objs) {
      if (err) {
        log('Found error %j', err)
        return fn(err)
      }

      log('Delivering all padrones %o', pluck(objs, 'nombre'))
      fn(null, objs)
    })
  return this
}

exports.get = function get (id) {
  log('Looking for Padron with id %s', id)

  return Padron
    .findById(id)
    .catch(err => log('Found error %j', err))
    .then(obj => {
      log('Delivering Padron %j', obj)
      return obj
    })
}*/
