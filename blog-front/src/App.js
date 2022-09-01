
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Dashboard from "./Dashboard";



import './App.css';
import { useState, useEffect } from "react"
import axios from 'axios';


const App = () => {
<<<<<<< HEAD
  
  let [memes, setMemes] = useState([])
  let [newTitle, setNewTitle] = useState("")
  let [newText,setNewText] = useState("")
  let [newImage, setNewImage] = useState("")

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleTextChange = (event) => {
    setNewText(event.target.value)
  }

  const handleImageChange = (event) => {      
      setNewImage(event.target.value)
    }

  const handleMemeCreation = (event) => {
    event.preventDefault()
    axios.post(`http://localhost:3001/${memes._id}`, 
    {
      title: newTitle,
      text: newText,
      image: newImage
    }
    ).then(() => {
      axios.get("http://localhost:3001").then((response=> {
        setMemes(response.data)
      }))
    })
  }

  
  useEffect(() => {
    axios.get('http://localhost:3000/memes')
    .then((response) => {
      setMemes(response.data)
    })
  }, [])
  
  const handleMemesDelete = (memes) => {
    axios.delete(`http://localhost:3000/memes/${memes._id}`).then(() => {
      axios.get("http://localhost:3000/memes").then((response) => {
        setMemes(response.data)
      })
    })
  }

  const editMemes = (memes) => {
    axios.put(`http://localhost:3000/memes/${memes._id}`, 
    {
      title: newTitle,
      text: newText,
      image: newImage
    }).then(() => {
      axios.get("http://localhost:3000/memes").then((response) => {
        setMemes(response.data)
      })
    })
  }

  return (
    <div>
    <h1 className="users">User's Blog</h1>
    <form className="form1" onSubmit={handleMemeCreation}>
    <h4>Title: <input className='textBox1' type="text" onChange={handleTitleChange}/></h4>
    <h4>Text: <input className='textBox2' type="text" onChange={handleTextChange}/><br/></h4>
    <h4>Image: <input className='textBox3' type="text" onChange={handleImageChange}/><br/></h4>
    <input type="submit" value="Submit Meme"/>
    </form>
    {memes.map((memes) => {
      return (
        <div>
          <h1>memes.title</h1>
          <button onClick={(event) => {
            handleMemesDelete(memes)
          }}>Delete</button>
          <details>
            <div>
              <form onSubmit={() => {{editMemes(memes)}}}>
              Title: <input type="text" onKeyUp={handleTitleChange}/>
              Text: <input type="text" onKeyUp={handleTextChange}/>
              Image: <input type="text" onKeyUpe={handleImageChange}/>
              <input type="submit" value="submit changes"/>
              </form>
            </div>
          </details>
        </div>
        
      )
    })}
=======
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/Dashboard" element={<Dashboard />}></Route>
                </Routes>
            </BrowserRouter>

>>>>>>> 64b6adb41b74930906360c557adb8cbab913d0b0
    </div>
    )}


export default App