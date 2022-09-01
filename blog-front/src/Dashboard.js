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
    const [newImage, setImage] = useState('')
    const [allPosts, setAllPost] = useState([])
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDelete = () => setOpenEdit(true);
    const handleCloseDelete = () => setOpenEdit(false);

    const handleNewTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleNewTextChange = (event) => {
        setText(event.target.value)
    }
    const handleNewImageChange = (event) => {
        setImage(event.target.value)
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
                <ul>
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
                                        <Form.Label>image</Form.Label><br />
                                        <Form.Control type="text" onChange={e => setImage(e.target.value)} value={newImage} placeholder="Title" />
                                    </Form.Group>
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
                </ul>
            </div>
            <section>
            </section>
            <h1>Personal Blog Page</h1>
            <p>Mern Stack Web Page</p>
            {allPosts.map((post) => {
                return (
                    <>
                        <div className="container">
                            <div className="card">
                                <div className="card__header">
                                    <img src="https://source.unsplash.com/600x400/?computer" alt="card__image" className="card__image" width="600" />
                                </div>
                                <div className="card__body">
                                    <span className="tag tag-red">Blog Post</span>
                                    <h4>{post.title}</h4>
                                    <p>{post.text}</p>
                                </div>
                                <div>

                                    <Button size="small" onClick={handleOpenEdit}>edit</Button>
                                    <Modal
                                        open={openEdit}
                                        onClose={handleCloseEdit}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Edit Post
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                <form onSubmit={(event) => { updatePost(event, post) }}>
                                                    <label>Title: <input type="text" defaultValue={post.title} onChange={handleNewTitleChange} /></label><br />
                                                    <label>Text: <textarea onChange={handleNewTextChange} defaultValue={post.text} placeholder="text"></textarea></label><br />
                                                    <input type="submit" value="update" />
                                                </form>
                                            </Typography>
                                        </Box>
                                    </Modal>
                                    <Button onClick={handleOpenDelete}>Delete</Button>
                                    <Modal
                                        open={openDelete}
                                        onClose={handleCloseDelete}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Are you sure you want to delete this post?
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                <button onClick={(event) => {
                                                    handleDelete(post)
                                                }}>delete</button>
                                            </Typography>
                                        </Box>
                                    </Modal>
                                </div>
                                <div className="card__footer">

                                    <div className="user">
                                        <img src="https://i.pravatar.cc/40?img=1" alt="user__image" className="user__image" />
                                        <div className="user__info">
                                            <h5>Ford Ranger</h5>
                                            <small>10mins ago</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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

        </div>
    )
}

export default Dashboard