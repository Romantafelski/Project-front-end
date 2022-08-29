import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"

const App = () => {
  
  let [meme, setMeme] = useState([])
  let [newPost, setPost] = useState("")

  const handleMemeCreation = (event) => {
    event.preventDefault()
    axios.post(`https://project-3-front.herokuapp.com/Schema/${meme._id}`, 
    {
      meme: newMeme
    }
    ).then(() => {
      axios.get("https://project-3-front.herokuapp.com/").then((response=> {
        setMeme(response.data)
      }))
    })
  }

  useEffect(() => {
    axios.get('https://project-3-front.herokuapp.com/')
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