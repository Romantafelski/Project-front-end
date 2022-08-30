import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"
import axios from 'axios';

const App = () => {
  
  let [memes, setMemes] = useState([])
  let [newTitle, setNewTitle] = useState("")
  let [newText,setNewText] = useState("")
  let [newImage, setNewImage] = useState("")

  handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  handleTextChange = (event) => {
    setNewText(event.target.value)
  }

    handleImageChange = (event) => {      
      setNewImage(event.target.value)
    }

  const handleMemeCreation = (event) => {
    event.preventDefault()
    axios.post(`https://project-3-front.herokuapp.com/memes/${memes._id}`, 
    {
      title: newTitle,
      text: newText,
      image: newImage
    }
    ).then(() => {
      axios.get("https://project-3-front.herokuapp.com/memes").then((response=> {
        setMeme(response.data)
      }))
    })
  }

  
  useEffect(() => {
    axios.get('https://project-3-front.herokuapp.com/memes')
    .then((response) => {
      setMeme(response.data)
    })
  }, [])
  
  const handleMemesDelete = (memes) => {
    axios.delete(`https://project-3-front.herokuapp.com/memes${memes.id}`).then(() => {
      axios.get("https://project-3-front.herokuapp.com/memes").then((response) => {
        setMemes(response.data)
      })
    })
  }

  const editMemes = (memes) => {
    axios.put(`https://project-3-front.herokuapp.com/${memes._id}`, 
    {
      title: newTitle,
      text: newText,
      image: newImage
    }).then(() => {
      axios.get("https://project-3-front.herokuapp.com/memes").then((response) => {
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
    <input type="submit" value="submit Meme"/>
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