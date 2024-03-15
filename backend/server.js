require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts.js')

// creates express app
const BlogChampApp = express()

// connects to routes
BlogChampApp.use(express.json())

// middleware to show requests
BlogChampApp.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// add routes for managing post data
BlogChampApp.use('/api/posts', postRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)

  // define what to do after connecting
  .then(() => {

    // listen for requests
    BlogChampApp.listen(process.env.PORT, () => {
      console.log('connected to DB and listening on port', process.env.PORT)
    })

  })

  // catch errors
  .catch((error) => {
    console.log(error)
  })

