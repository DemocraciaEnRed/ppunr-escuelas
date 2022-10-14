var mongoose = require('mongoose')
var Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Vote = new Schema({
  topic: { type: ObjectId, ref: 'Topic', required: true },
  author: { type: ObjectId, ref: 'User', required: true },
  value: { type: String, required: true },
  dni: { type: String, required: true },
  claustro: { type: ObjectId, ref: 'Claustro', required: false },
  createdAt: { type: Date, default: Date.now }
})

/**
 * Define Schema Indexes for MongoDB
 */

Vote.index({ topic: 1 })
Vote.index({ createdAt: -1 })

/**
 * Make Schema `.toObject()` and
 * `.toJSON()` parse getters for
 * proper JSON API response
 */

Vote.set('toObject', { getters: true })
Vote.set('toJSON', { getters: true })

module.exports = function initialize (conn) {
  return conn.model('Vote', Vote)
}
