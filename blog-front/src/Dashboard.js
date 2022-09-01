import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from 'axios'
import Form from 'react-bootstrap/Form';

const Dashboard = () => {
    let navigate = useNavigate()
    // const [quote, setQuote] = useState('')
    // const [tempQuote, setTempQuote] = useState('')
    const [newTitle, setTitle] = useState('')
    const [newText, setText] = useState('')
    const [allPosts, setAllPost] = useState([])
    const [post, setPost] = useState('')

    // async function populateQuote() {
    //     const req = await fetch('http://localhost:3000/api/quote', {
    //         headers: {
    //             'x-access-token': localStorage.getItem('token')
    //         }
    //     })

    //     const data = await req.json()
    //     if (data.status === 'ok') {
    //         setQuote(data.quote)
    //     } else {
    //         alert(data.error)
    //     }
    // }
    async function populatePosts() {
        const req = await fetch('http://localhost:3000/api/blog', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setPost(data.post)
        } else {
            alert(data.error)
        }
    }

    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //         const user = jwt_decode(token)
    //         if (!user) {
    //             localStorage.removeItem('token')
    //             navigate.replace('/login')
    //         } else {
    //             populateQuote()
    //         }
    //     }
    // }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt_decode(token)
            if (!user) {
                localStorage.removeItem('token')
                navigate.replace('/login')
            } else {
                populatePosts()
            }
        }
    }, [])

    // async function updateQuote(event) {
    //     event.preventDefault()
    //     const req = await fetch('http://localhost:3000/api/quote', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'x-access-token': localStorage.getItem('token')
    //         },
    //         body: JSON.stringify({
    //             quote: tempQuote
    //         })
    //     })

    //     const data = await req.json()
    //     if (data.status === 'ok') {
    //         setTempQuote('')
    //         setQuote(tempQuote)
    //     } else {
    //         alert(data.error)
    //     }
    // }


    const handleNewPostFormSubmit = async (event) => {
        event.preventDefault()

        const req = await fetch('http://localhost:3000/api/blog', {
            method: 'POST',
            body: JSON.stringify({
                title: newTitle,
                text: newText
            }),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setText('')
            setTitle('')
            setAllPost([])
        } else {
            alert(data.error)
        }
    }




    return (
        <div>
            <h1>{ }</h1>
            {/* <h1>Your Quote: {quote || 'No quote found'}</h1>
            <form onSubmit={updateQuote}>
                <input type="text" placeholder="Quote" value={tempQuote} onChange={e => setTempQuote(e.target.value)} />
                <input type="submit" value="update quote" />
            </form> */}

            <section>
                <h2></h2>
                <Form onSubmit={handleNewPostFormSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label><br />
                        <Form.Control type="text" onChange={e => setTitle(e.target.value)} value={newTitle} placeholder="Title" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Text</Form.Label><br />
                        <Form.Control as="textarea" rows={3} onChange={e => setText(e.target.value)} value={newText} placeholder="text" />
                    </Form.Group>
                    {/* <input type="text" onChange={handleNewTitleChange} placeholder="Title" /><br />
                    <textarea onChange={handleNewTextChange} placeholder="text"></textarea><br /> */}
                    <input type="submit" value="Create Post" />
                </Form>
            </section>
        </div>
    )
}

export default Dashboard