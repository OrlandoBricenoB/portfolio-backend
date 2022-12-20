const { Router } = require('express')

const router = Router()

// * General Routes
router.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Hello world!',
    from: 'orlandobricenob.dev'
  })
})

// * User Router
const userRouter = require('./users.routes')
router.use('/users/', userRouter)

// * User Router
const recommendationRouter = require('./recommendation.routes')
router.use('/recommendations/', recommendationRouter)

module.exports = router
