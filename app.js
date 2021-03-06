const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv');
const reportsRouter = require('./controller/reports')
const loginRouter = require('./controller/login')
const authRouter = require('./routes/auth')
const pingRouter = require('./controller/ping')
const zoneRouter = require('./controller/zones')
const rewardRouter = require('./controller/reward') 
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

dotenv.config({path: 'config.env'})

const uri =  `mongodb+srv://${process.env.mongoDBname}:${process.env.password}@${process.env.clusterUrl}/?authMechanism=${process.env.authMechanism}`;

logger.info('connecting to', uri)

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/report', reportsRouter)
app.use('/api/login', loginRouter)
app.use('/api/auth', authRouter)
app.use('/api/ping', pingRouter)
app.use('/api/zone', zoneRouter)
app.use('/api/reward', rewardRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app