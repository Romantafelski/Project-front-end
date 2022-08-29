//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Blog = require('./models/blog.js')
require('dotenv').config()

const app = express();

app.use(express.json())
app.use(cors())

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;


//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);


//-----------------------------------------------
//      GET SINGLE Blog
//-----------------------------------------------
app.get('/Blogs/:id', (req, res) => {
    Blog.find({}, (err,foundBlog) => {
      res.json(foundBlog)
    })
  })
  
  //-----------------------------------------------
  //      NEW Blog
  //-----------------------------------------------
  app.post('/Blogs', (req, res) => {
    Blog.create(req.body, (err, createdBlog)=>{
      res.json(createdBlog)
    })
  })
  
  //-----------------------------------------------
  //      GET ALL BlogS
  //-----------------------------------------------
  app.get('/Blogs', (req, res) => {
    Blog.find({}, (err,foundBlogs) => {
      res.json(foundBlogs)
    })
  })
  
  //-----------------------------------------------
  //      DELETE Blog
  //-----------------------------------------------
  app.delete('/Blogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err, deletedBlog) => {
      res.json(deletedBlog)
    })
  })
  
  //-----------------------------------------------
  //      EDIT Blog
  //-----------------------------------------------
  app.put('/Blogs/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBlog) => {
      res.json(updatedBlog)
    })
  })

  //___________________
//Listener
//___________________
app.listen(process.env.PORT, () => console.log(process.env.PORT));
