import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"

const App = () => {
  
  let [newMeme, setMeme] = useState("")

  const handleMemeCreation = (event) => {
    event.preventDefault()
    axios.post("https://cloud.mongodb.com/v2/630cf27486a7d66b617b671f#metrics/replicaSet/630cf2c6edfa1c6c1f06bf48/explorer/front-end-memes/memesCrud/find", 
    {
      meme: newMeme
    }
    ).then(() => {
      axios.get("https://cloud.mongodb.com/v2/630cf27486a7d66b617b671f#metrics/replicaSet/630cf2c6edfa1c6c1f06bf48/explorer/front-end-memes/memesCrud/find").then((respons => {
        setMeme(response.data)
      }))
    })
  }

  useEffect(() => {
    axios.get('https://cloud.mongodb.com/v2/630cf27486a7d66b617b671f#metrics/replicaSet/630cf2c6edfa1c6c1f06bf48/explorer/front-end-memes/memesCrud/find')
    .then((response) => {
      setMeme(response.data)
    })
  }, [])

  return (
    <h1>Hello World</h1>
  )
}

export default App