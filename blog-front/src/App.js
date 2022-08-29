import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"

const App = () => {
  
  let [newMeme, setMeme] = useState("")

  const handleMemeCreation = (event) => {
    event.preventDefault()
    axios.post("https://project-3-front.herokuapp.com/Schema", 
    {
      meme: newMeme
    }
    ).then(() => {
      axios.get("https://project-3-front.herokuapp.com/Schema").then((response=> {
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
    <h1>Hello World</h1>
  )
}

export default App