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

router.get('/uploads/:image', (req, res) => {
  const { image } = req.params
  
  const filePath = path.join(__dirname, `../public/uploads/${image.split('&w')[0]}`)
  console.log({ filePath })
  res.sendFile(filePath)
})

// * User Router
const userRouter = require('./users.routes')
router.use('/users/', userRouter)

// * User Router
const recommendationRouter = require('./recommendation.routes')
router.use('/recommendations/', recommendationRouter)

module.exports = router
