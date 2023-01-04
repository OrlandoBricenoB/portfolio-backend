const mongoose = require('mongoose')

const connect = async () => {
  try {
    mongoose.set('strictQuery', false)

    const connectUri = process.env.DOMAIN.includes('localhost')
      ? 'mongodb://localhost:27017/portfolio'
      : `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/portfolio`

    const connection = await mongoose.connect(connectUri)

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
