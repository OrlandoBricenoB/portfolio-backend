// * Utils
const { v4: uuidv4 } = require('uuid')

// * Models
const Recommendation = require('../models/Recommendation')
const User = require('../models/User')

const getAll = async (req, res) => {
  const verified = JSON.parse(req.query?.verified || null) ?? true
  const recommendations = await Recommendation.find()

  res.json(recommendations.filter(recommendation => verified === recommendation.verified))
}

const getOne = async (req, res) => {
  const { uuid } = req.params

  const recommendation = await Recommendation.findOne({ uuid })

  if (!recommendation) {
    res.status(404).json({
      error: {
        name: 'NotFound',
        message: 'Recommendation not found.'
      }
    })
    return
  }

  res.json(recommendation)
}

const create = async (req, res) => {
  const data = req.body

  console.log({ data })

  // * Crear el usuario basado en la recomendación.
  const user = new User()
  user.uuid = uuidv4()
  user.createDate = new Date()
  user.name = data?.user?.name || ''
  user.image = ''

  await user.save()

  const recommendation = new Recommendation()

  for (const field in data) {
    recommendation[field] = data[field]
  }

  recommendation.uuid = uuidv4()
  recommendation.userUUID = user.uuid
  recommendation.createDate = new Date()
  recommendation.verified = false

  await recommendation.save()

  res.json(recommendation)
}

const update = async (req, res) => {
  const data = req.body

  const recommendation = await Recommendation.findOne({ uuid: data.uuid })

  if (!recommendation) {
    return res.status(404).json({
      error: {
        name: 'NotFound',
        message: 'Recommendation not found.'
      }
    })
  }

  for (const field in data) {
    recommendation[field] = data[field]
  }

  await recommendation.save()

  res.json(recommendation)
}

const remove = async (req, res) => {
  const { uuid } = req.params

  const recommendation = await Recommendation.findOne({ uuid })

  if (!recommendation) {
    res.status(404).json({
      error: {
        name: 'NotFound',
        message: 'Recommendation not found.'
      }
    })
    return
  }

  await recommendation.delete()

  res.json(recommendation)
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
}
