const mongoose = require('mongoose')

const connect = async () => {
  try {
    mongoose.set('strictQuery', false)
    const connection = await mongoose.connect('mongodb://localhost:27017/portfolio')

    return [
      null,
      connection
    ]
  } catch (error) {
    return [
      new Error('Can\'t connect to database.'),
      null
    ]
  }
}

module.exports = connect
