import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'

import Container from '@mui/material/Container';
import { useState, useEffect } from "react"
import axios from 'axios'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const App = () => {
  const [newTitle, setTitle] = useState('')
  const [newText, setText] = useState('')
  const [allPosts, setAllPost] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event) {
    event.preventDefault()
    const response = await fetch('https://pacific-savannah-73208.herokuapp.com/', {
      method: 'POST',
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
    axios.post('https://pacific-savannah-73208.herokuapp.com/', {
      title: newTitle,
      text: newText
    }).then(() => {
      axios.get('https://pacific-savannah-73208.herokuapp.com/').then((response) => {
        setAllPost(response.data)
      })
    })
  }

  useEffect(() => {
    axios.get('https://pacific-savannah-73208.herokuapp.com/').then((response) => {
      setAllPost(response.data)
    })
  })

  const handleDelete = (postData) => {
    axios.delete(`https://pacific-savannah-73208.herokuapp.com/${postData._id}`).then((response) => {
      setAllPost(response.data)
    })
  }

  const updatePost = (e, post) => {
    e.preventDefault()
    axios.put(`https://pacific-savannah-73208.herokuapp.com/${post._id}`,
      {
        title: newTitle,
        text: newText

      }).then(() => {
        axios.get('https://pacific-savannah-73208.herokuapp.com/').then((response) => {

          setAllPost(response.data)
        })
      })
  }

  const theme = createTheme();

  return (
    <>
      <ThemeProvider theme={theme}></ThemeProvider>
      <CssBaseline />
      <Container maxWidth="lg">
        <header>Blog</header>
        <section>
          <h2></h2>
          <form onSubmit={handleNewPostFormSubmit}>
            <input type="text" onChange={handleNewTitleChange} placeholder="Title" /><br />
            <textarea onChange={handleNewTextChange} placeholder="text"></textarea><br />
            <input type="submit" value="Create Post" />
          </form>
        </section>
        <h2>Blog Posts</h2>
        
        {allPosts.map((post) => {
          return (
            <>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.text}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
              <>
                <details>
                  <form onSubmit={(event) => { updatePost(event, post) }}>
                    <label>Title: <input type="text" defaultValue={post.title} onChange={handleNewTitleChange} /></label><br />
                    <label>Text: <textarea onChange={handleNewTextChange} placeholder="text"></textarea></label><br />
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
      </Container>
      <div>
        <details>
          <h1>Register</h1>
          <form onSubmit={registerUser}>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' /><br />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' /><br />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' /><br />
            <input type="submit" value="Register" />
          </form>
        </details>
      </div>
    </>
  )
}

export default App