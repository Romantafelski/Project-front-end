import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react"
import axios from 'axios'

const App = () => {
  const [newTitle, setTitle] = useState('')
  const [newText, setText] = useState('')
  const [allPosts, setAllPost] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:3000/api/register', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email, 
        password
      })
    })

    const data = await response.json()

    console.log(data)
  }


  const handleNewTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleNewTextChange = (event) => {
    setText(event.target.value)
  }

  const handleNewPostFormSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3000/Blogs', {
      title: newTitle,
      text: newText
    }).then(() => {
      axios.get('http://localhost:3000/Blogs').then((response) => {
        setAllPost(response.data)
      })
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3000/Blogs').then((response) => {
      setAllPost(response.data)
    })
  })

  const handleDelete = (postData) => {
    axios.delete(`http://localhost:3000/blogs/${postData._id}`).then((response) => {
      setAllPost(response.data)
    })
  }

  const updatePost = (e, post) => {
    e.preventDefault()
    axios.put(`http://localhost:3000/blogs/${post._id}`,
      {
        title: newTitle,
        text: newText

      }).then(() => {
        axios.get('http://localhost:3000/blogs').then((response) => {

          setAllPost(response.data)
        })
      })
  }


  return (
    <>
      <h1>Blog</h1>
      <section>
        <h2></h2>
        <form onSubmit={handleNewPostFormSubmit}>
          <input type="text" onChange={handleNewTitleChange} placeholder="Title" /><br />
          <input type="text" onChange={handleNewTextChange} placeholder="Text" /><br />
          <input type="submit" value="Create Post" />
        </form>
      </section>
      <h2>Blog Posts</h2>
      {allPosts.map((post) => {
        return (
          <>
            <p>{post.title}</p>
            <p>{post.text}</p>

            <>
            <details>
              <form onSubmit={(event) => { updatePost(event, post) }}>
                <label>Title: <input type="text" defaultValue={post.title} onChange={handleNewTitleChange} /></label><br />
                <label>Text: <input type="text" defaultValue={post.text} onChange={handleNewTextChange} /></label><br />
                <input type="submit" value="update" />
              </form>
              <button onClick={(event) => {
                handleDelete(post)
              }}>delete</button>
              </details>
            </>
          </>
        )
      })}
      <div>
        <h1>Register</h1>
        <form onSubmit={registerUser}>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Name'/><br/>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email'/><br/>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password'/><br/>
          <input type="submit" value="Register"/>
        </form>
      </div>
    </>
  )
}

export default App