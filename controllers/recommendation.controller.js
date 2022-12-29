// * Utils
const { v4: uuidv4 } = require('uuid')

// * Models
const Recommendation = require('../models/Recommendation')

// ! Añadir un queryString para traer solo los no-verificados.
const getAll = async (req, res) => {
  const recommendations = await Recommendation.find()

  res.json(recommendations.filter(recommendation => recommendation.verified))
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

  const recommendation = new Recommendation()
  recommendation.uuid = uuidv4()
  recommendation.createDate = new Date()

  for (const field in data) {
    recommendation[field] = data[field]
  }

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
