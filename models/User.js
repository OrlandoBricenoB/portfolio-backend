const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  uuid: String,
  name: String,
  lastname: String,
  image: String,
  email: String,
  createDate: Date
})

const User = model('User', userSchema)

module.exports = User
