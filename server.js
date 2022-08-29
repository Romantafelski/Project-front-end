
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Schema = require('./models/blog.js')
require('dotenv').config()

const app = express();

app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 3003;



const MONGODB_URI = process.env.MONGODB_URI;


mongoose.connect(MONGODB_URI);



app.get('/:id', (req, res) => {
    Blog.find({}, (err,foundBlog) => {
      res.json(foundBlog)
    })
  })
  

  app.pos('/', (req, res) => {
    Blog.create(req.body, (err, createdBlog)=>{
      res.json(createdBlog)
    })
  })
  


  app.get('/', (req, res) => {
    Blog.find({}, (err,foundBlogs) => {
      res.json(foundBlogs)
    })
  })
  

  app.delete('/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err, deletedBlog) => {
      res.json(deletedBlog)
    })
  })
  

  app.put('/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBlog) => {
      res.json(updatedBlog)
    })
  })


app.listen(process.env.PORT, () => console.log(process.env.PORT));
