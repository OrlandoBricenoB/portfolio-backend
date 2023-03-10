const { Schema, model } = require('mongoose')

const recommendationSchema = new Schema({
  uuid: String,
  userUUID: String,
  message: String,
  quantity: Number,
  verified: Boolean,
  createDate: Date
})

const Recommendation = model('Recommendation', recommendationSchema)

module.exports = Recommendation
