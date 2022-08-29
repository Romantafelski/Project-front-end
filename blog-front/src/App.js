import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"

const App = () => {
  
  let [newMeme, setMeme] = useState("")

  const handleMemeCreation = (event) => {
    event.preventDefault()
    axios.post("mongodb+srv://romantafelski:<BAlx1lWvh3WeMSF1>@cluster0.bvtgvvk.mongodb.net/?retryWrites=true&w=majority", 
    {
      meme: newMeme
    }
    ).then(() => {
      axios.get("mongodb+srv://romantafelski:<BAlx1lWvh3WeMSF1>@cluster0.bvtgvvk.mongodb.net/?retryWrites=true&w=majority").then((respons => {
        setMeme(response.data)
      }))
    })
  }

  useEffect(() => {
    axios.get('mongodb+srv://romantafelski:<BAlx1lWvh3WeMSF1>@cluster0.bvtgvvk.mongodb.net/?retryWrites=true&w=majority')
    .then((response) => {
      setMeme(response.data)
    })
  }, [])

  return (
    <h1>Hello World</h1>
  )
}

export default App