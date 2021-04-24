const ENVIRONMENT = process.env.NODE_ENV || 'development'
require('dotenv').config({ path: `.env.${ENVIRONMENT}` })

const express = require('express')
const app = express()
const contactsRoute = require('./routes/contacts')
const authRoute = require('./routes/auth')

app.use(express.json())

app.use('/contacts', contactsRoute)
app.use('/auth', authRoute)

app.use(function (req, res, next) {
  const error = new Error('Resource Not Found')
  error.status = 404
  next(error)
})

app.use(function (error, req, res, next) {
  res.status(error.status || 500).json({
    status: error.status,
    message: error.message
  })
})

module.exports = app
