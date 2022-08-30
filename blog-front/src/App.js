import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"

const App = () => {
  
  let [memes, setMemes] = useState([])
  let [newPost, setPost] = useState("")

  const handleMemeCreation = (event) => {
    event.preventDefault()
    axios.post(`https://project-3-front.herokuapp.com/memes/${memes._id}`, 
    {
      meme: newMeme
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

  return (
    <div>
    <h1>Hello World</h1>
    <form onSubmit={handleMemeCreation}>
    Meme: <input type="text"/>
    </form>
    </div>
  )
}

export default App