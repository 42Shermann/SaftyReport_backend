const app = require('./app') // the actual Express application
const http = require('http')
const logger = require('./utils/logger')
const dotenv = require('dotenv');

const server = http.createServer(app)

dotenv.config({path: 'config.env'})

server.listen(process.env.PORT, () => {
  logger.info(`Server running on port ${process.env.PORT}`)
})