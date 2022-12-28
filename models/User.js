const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  uuid: String,
  name: String,
  image: String,
  createDate: Date
})

const User = model('User', userSchema)

module.exports = User
