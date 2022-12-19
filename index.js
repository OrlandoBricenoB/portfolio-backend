require('dotenv').config()

const express = require('express')

const isNumber = require('./utils/isNumber')

const PORT = process.env.PORT || 5000
const app = express()

// * Ruta principal.
app.get('/api/v1/', (req, res) => {
  res.json({
    ok: true,
    message: 'Hello world!',
    from: 'orlandobricenob.dev'
  })
})

app.get('/api/v1/:id', (req, res) => {
  const { id } = req.params

  if (!isNumber(Number(id))) {
    res.status(401).json({
      error: {
        name: 'BadRequest',
        message: 'ID is not a number.'
      }
    })
    return
  }

  res.json({
    ok: true,
    message: 'Usuario de id: ' + id,
    from: 'orlandobricenob.dev'
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`)
})
