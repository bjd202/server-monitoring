import axios from 'axios';
import React, { useState } from 'react'

import {Button, Container, Form, Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './css/server.monitoring.css'


function Login() {

  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({})

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    axios.post('http://localhost:4000/login', formData)
    .then(res => {
      console.log(res.data)
      console.log(localStorage.getItem('username'))
      localStorage.setItem('username', res.data)
      // navigate('/')
      window.location.replace('/')
    })
    .catch(err => {
      console.log(err)
      alert('잘못된 입력입니다.')
    })
  }

  const handleChange = (e) => {
    const {id, value} = e.target
    
    setFormData({
      ...formData,
      [id]: value
    })
  }

  return (
    <Container>
      <div className='login'>
        <div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>ID</Form.Label>
              <Form.Control required type="text" placeholder="" onChange={handleChange} />

              <Form.Control.Feedback type="invalid">
                ID는 필수 값 입니다.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="" onChange={handleChange} />

              <Form.Control.Feedback type="invalid">
                Password는 필수 값 입니다.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              로그인
            </Button>
          </Form>
        </div>
      </div>
    </Container>
    
  )
}

export default Login