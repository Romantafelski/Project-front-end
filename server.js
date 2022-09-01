
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
  console.log("It is working")
})



app.get('https://project-3-front.herokuapp.com/:id', (req, res) => {
    Schema.find({}, (err,data) => {
      res.json(data)
    })
  })
  

  app.post('https://project-3-front.herokuapp.com/', (req, res) => {
    Schema.create(req.body, (err, data)=>{
      res.json(data)
    })
  })
  


  app.get('https://project-3-front.herokuapp.com/', (req, res) => {
    Schema.find({}, (err,data) => {
      res.json(data)
    })
  })
  

  app.delete('https://project-3-front.herokuapp.com/:id', (req, res) => {
    Schema.findByIdAndRemove(req.params.id, (err, data) => {
      res.json(data)
    })
  })
  

  app.put('https://project-3-front.herokuapp.com/:id', (req, res) => {
    Schema.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, data) => {
      res.json(data)
    })
  })

app.listen(process.env.PORT, () => console.log(process.env.PORT));
