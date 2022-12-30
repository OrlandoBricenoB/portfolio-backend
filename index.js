require('dotenv').config()
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 5000
const app = express()
 
// * Allow body with json data.
app.use(express.json({ limit: '5mb' }))
app.use(cors())

// * Import database connect.
const connect = require('./connection')

// * Router
const apiV1 = require('./routes/index.routes')

app.use('/api/v1/', apiV1)

// * On server with reconnect system.
const onServer = async () => {
  const [error] = await connect()
  
  if (error) {
    console.log({ error, message: 'Fijate hay error' })
    setTimeout(() => {
      console.log('-- Reintentar encendido.')
      onServer()
    }, 5000)
  } else {
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`)
    })
  }
}
onServer()
