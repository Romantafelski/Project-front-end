
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Schema = require('./models/Schema.js')
require('dotenv').config()

const app = express();

app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 3003;


app.use(express.urlencoded({ extended: false }))



const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);
mongoose.connection.once("open", () => {
  console.log("Mongod is connected")
})



app.get('/:id', (req, res) => {
    Schema.find({}, (err,foundBlog) => {
      res.json(foundBlog)
    })
  })
  

  app.post('/', (req, res) => {
    Schema.create(req.body, (err, createdBlog)=>{
      res.json(createdBlog)
    })
  })
  


  app.get('/', (req, res) => {
    Schema.find({}, (err,foundBlogs) => {
      res.json(foundBlogs)
    })
  })
  

  app.delete('/:id', (req, res) => {
    Schema.findByIdAndRemove(req.params.id, (err, deletedBlog) => {
      res.json(deletedBlog)
    })
  })
  

  app.put('/:id', (req, res) => {
    Sche.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBlog) => {
      res.json(updatedBlog)
    })
  })

app.listen(process.env.PORT, () => console.log(process.env.PORT));
