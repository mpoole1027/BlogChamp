require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts.js')
const userRoutes = require('./routes/users.js')
const blogRoutes = require('./routes/blogs.js')
const cors = require("cors")

// set permissions for the front end
const corsOptions = {
  origin: "http://localhost:5173",
}

// creates express app
const BlogChampApp = express()

// let the front end access the server
BlogChampApp.use(cors(corsOptions))

// connects to routes
BlogChampApp.use(express.json())

// middleware to show requests
BlogChampApp.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// add routes for managing post data
BlogChampApp.use('/api/posts', postRoutes)

BlogChampApp.use('/api/users', userRoutes)

BlogChampApp.use('/api/blogs', blogRoutes)

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

