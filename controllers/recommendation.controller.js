const path = require('path')
const fs = require('fs')

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

  if (!data.user.image) {
    return res.status(401).json({
      error: {
        name: 'BadRequest',
        message: 'Image is empty'
      }
    })
  }

  const userUUID = uuidv4()

  const base64Data = data.user.image
  const imagePath = `${userUUID}.png`
  const filePath = path.join(__dirname, `../public/uploads/${imagePath}`)

  // * Es necesario remover desde la , hacia atrás para obtener todo el base64 puro.
  fs.writeFileSync(filePath, base64Data.split('base64,')[1], 'base64')

  // * Crear el usuario basado en la recomendación.
  const user = new User()
  user.uuid = userUUID
  user.createDate = new Date()
  user.name = data?.user?.name || ''
  user.image = `${process.env.DOMAIN}/api/v1/uploads/${imagePath}`
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
