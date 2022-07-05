import axios from 'axios'
import React, { useState } from 'react'
import { Button, ButtonGroup, Card, Container, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function ServerEdit() {
    const navigate = useNavigate()

    if (localStorage.getItem('username') === null) {
      navigate('/login')
    }

    const location = useLocation()
    const data = location.state.data

    const [validated, setValidated] = useState(false)
    const [formData, setFormData] = useState({...data})
    // const [alertShow, setAlertShow] = useState(false)
  
    const handleChange = (e) => {
      const {id, value} = e.target
      
      setFormData({
        ...formData,
        [id]: value
      })

      console.log(formData)
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
  
      setValidated(true);
  
      axios.patch('http://localhost:4000/server/edit', formData)
      .then(res => {
        console.log(res.data)
  
        if(res.data === 'success'){
          navigate('/server/list')
        }else{

        }
      })
      .catch(err => console.error(err))
    }
  
    return (
      <Container>
        <Card text="white" className="h-100" style={{ marginTop: 50 }}>
          <Card.Header style={{ backgroundColor: "#6D4E90" }}>Server 추가</Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {/* 서버이름, os, hostname, ip, */}
              <Form.Group style={{color: 'black'}} controlId="id">
                <Form.Control type='hidden' defaultValue={data.id} />
              </Form.Group>

              <Form.Group style={{color: 'black'}} controlId="name">
                <Form.Label>서버 이름</Form.Label>
                <Form.Control 
                  required
                  type="text"
                  onChange={handleChange}
                  defaultValue={data.name}
                />
                <Form.Control.Feedback type="invalid">
                  서버 이름은 필수 값 입니다.
                </Form.Control.Feedback>
              </Form.Group>
  
              <Form.Group style={{color: 'black'}} controlId="hostname">
                <Form.Label>Hostname</Form.Label>
                <Form.Control 
                  required
                  type="text"
                  onChange={handleChange}
                  defaultValue={data.hostname}
                />
                <Form.Control.Feedback type="invalid">
                  Hostname은 필수 값 입니다.
                </Form.Control.Feedback>
              </Form.Group>
  
              <Form.Group style={{color: 'black'}} controlId="os">
                <Form.Label>OS</Form.Label>
                <Form.Select onChange={handleChange} defaultValue={data.os}>
                  <option value={'Windows'}>Windows</option>
                  <option value={'Linux'}>Linux</option>
                  <option value={'Unix'}>Unix</option>
                </Form.Select>
              </Form.Group>
  
              <Form.Group style={{color: 'black'}} controlId="ip">
                <Form.Label>IP</Form.Label>
                <Form.Control 
                  required
                  type="text"
                  onChange={handleChange}
                  defaultValue={data.ip}
                />
                <Form.Control.Feedback type="invalid">
                  IP는 필수 값 입니다.
                </Form.Control.Feedback>
              </Form.Group>
  
              <Form.Group style={{color: 'black'}} controlId="use_yn">
                <Form.Label>사용여부</Form.Label>
                <Form.Select onChange={handleChange} defaultValue={data.use_yn}>
                  <option value={'Y'}>사용</option>
                  <option value={'N'}>미사용</option>
                </Form.Select>
              </Form.Group>
  
              <ButtonGroup style={{marginTop: 50}}>
                <Button type="submit" style={{backgroundColor: '#6D4E90', borderColor: '#6D4E90'}}>수정</Button>
                <Button 
                  style={{backgroundColor: '#6D4E90', borderColor: '#6D4E90'}}
                  as={Link}
                  to="/server/list"
                >목록</Button>
              </ButtonGroup>
            </Form>
          </Card.Body>
        </Card>
  
        {/* <CustomAlert
          show={alertShow}
          onHide={() => setAlertShow(false)}
        /> */}
      </Container>
    );
}

export default ServerEdit