import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';




const App = () => {
  let navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event) {
    event.preventDefault()
    const response = await fetch('https://pacific-savannah-73208.herokuapp.com/api/register', {
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

    if (data.status === 'ok') {
      window.location.href = '/login'
    }
  }

  return (
    <>
      <h1>Register</h1>
      <Form onSubmit={registerUser}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label><br/>
          <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        {/* <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Name' /><br /> */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label><br/>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label><br/>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        {/* <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' /><br /> */}
        {/* <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' /><br /> */}
        <input type="submit" value="Register" />
      </Form>
      </>
      )
}

      export default App