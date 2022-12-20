const { Router } = require('express')
const { getAll, getOne, create, remove, update } = require('../controllers/recommendation.controller')
const router = Router()

// * Routes
router.get('/', getAll)
router.get('/:uuid', getOne)
router.post('/create', create)
router.put('/update', update)
router.delete('/delete/:uuid', remove)

module.exports = router
