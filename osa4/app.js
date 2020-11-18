require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require("./controllers/blogs")

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        logger.info('connected to mongoDB')
    })
    .catch(error => {
        logger.error("error connecting to mongoDB", error.message)
    })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app
