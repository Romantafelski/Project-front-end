import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"
import axios from 'axios';

const App = () => {
  
  let [memes, setMemes] = useState([])
  let [newTitle, setTitle] = useState("")
  let [newText,setNewText] = useState("")
  let [newImage, setNewImage] = useState("")

  handleChangeTitle = (event) => {
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
    Title: <input type="text"/>
    Text: <input type="text"/>
    Image: <input type="text"/>
    </form>
    </div>
  )
}

export default App