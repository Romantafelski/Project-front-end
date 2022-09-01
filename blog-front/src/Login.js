import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const App = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function loginUser(event) {
        event.preventDefault()
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json()

        if (data.user) {
            localStorage.setItem('token', data.user)
            alert('Login Succesful')
            window.location.href = '/Dashboard'
        } else {
            alert('Please check your username and password')
        }
        console.log(data)
    }

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={loginUser}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label><br />
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label><br />
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                {/* <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' /><br />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' /><br /> */}
                <input type="submit" value="Login" />
            </Form>
        </div>
    )
}

export default App