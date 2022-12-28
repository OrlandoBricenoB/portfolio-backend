const { Schema, model } = require('mongoose')

const recommendationSchema = new Schema({
  uuid: String,
  userUUID: String,
  message: String,
  quantity: Number,
  createDate: Date
})

const Recommendation = model('Recommendation', recommendationSchema)

module.exports = Recommendation
