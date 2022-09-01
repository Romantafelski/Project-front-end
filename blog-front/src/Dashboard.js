import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Container from '@mui/material/Container';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Dashboard = () => {
    let navigate = useNavigate()

    const [newTitle, setTitle] = useState('')
    const [newText, setText] = useState('')
    const [allPosts, setAllPost] = useState([])
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        <div>
            <div>
                <Button onClick={handleOpen}>Create Post</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Make a blog post
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Form onSubmit={handleNewPostFormSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label><br />
                        <Form.Control type="text" onChange={e => setTitle(e.target.value)} value={newTitle} placeholder="Title" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Text</Form.Label><br />
                        <Form.Control as="textarea" rows={3} onChange={e => setText(e.target.value)} value={newText} placeholder="text" />
                    </Form.Group>
                    <input type="submit" value="Create Post" />
                </Form>
                        </Typography>
                    </Box>
                </Modal>
            </div>
            <section>
            </section>
            <h1>Personal Blog Page</h1>
            <Container maxWidth="lg">
                {allPosts.map((post) => {
                    return (
                        <>
                            <Card sx={{ maxWidth: 345 }}>
                                <hr />
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
        </div>
    )
}

export default Dashboard