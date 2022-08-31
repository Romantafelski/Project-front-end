

import './App.css';
import {useState, useEffect} from "react"
import axios from 'axios';
require('dotenv').config()


const App = () => {
  
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
    axios.post(`http://localhost:3000/memes/${memes._id}`, 
    {
      title: newTitle,
      text: newText,
      image: newImage
    }
    ).then(() => {
      axios.get("http://localhost:3000/meme").then((response=> {
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
    <h1>Hello World</h1>
    <form onSubmit={handleMemeCreation}>
    Title: <input type="text" onChange={handleTitleChange}/>
    Text: <input type="text" onChange={handleTextChange}/><br/>
    Image: <input type="text" onChange={handleImageChange}/><br/>
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
              Text: <input type="text" onKeyUp={handleTextChange}/><br/>
              Image: <input type="text" onKeyUpe={handleImageChange}/><br/>
              <input type="submit" value="submit changes"/>
              </form>
            </div>
          </details>
        </div>
        
      )
    })}
    </div>
  )
}

export default App