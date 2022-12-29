// * Utils
const { v4: uuidv4 } = require('uuid')

// * Models
const User = require('../models/User')

const getAll = async (req, res) => {
  const users = await User.find()

  res.json(users)
}

const getOne = async (req, res) => {
  const { uuid } = req.params

  const user = await User.findOne({ uuid })

  if (!user) {
    res.status(404).json({
      error: {
        name: 'NotFound',
        message: 'User not found.'
      }
    })
    return
  }

  res.json(user)
}

const create = async (req, res) => {
  const data = req.body

  const existEmail = await User.findOne({ email: data?.email })

  if (existEmail && data.email) {
    return res.status(401).json({
      error: {
        name: 'AlreadyExists',
        message: 'Already exists an user with same email.'
      }
    })
  }

  const user = new User()
  user.uuid = uuidv4()
  user.createDate = new Date()

  for (const field in data) {
    user[field] = data[field]
  }

  await user.save()

  res.json(user)
}

const update = async (req, res) => {
  const data = req.body

  const user = await User.findOne({ uuid: data.uuid })

  if (!user) {
    return res.status(404).json({
      error: {
        name: 'NotFound',
        message: 'User not found.'
      }
    })
  }

  const existEmail = await User.findOne({ email: data.email })
  if (existEmail && existEmail.uuid !== user.uuid) {
    return res.status(401).json({
      name: 'AlreadyExists',
      message: 'Already exists an user with same email.'
    })
  }

  for (const field in data) {
    user[field] = data[field]
  }

  await user.save()

  res.json(user)
}

const remove = async (req, res) => {
  const { uuid } = req.params

  const user = await User.findOne({ uuid })

  if (!user) {
    res.status(404).json({
      error: {
        name: 'NotFound',
        message: 'User not found.'
      }
    })
    return
  }

  await user.delete()

  res.json(user)
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
}
