import React from 'react'
import { Button, ButtonGroup, Card, Container, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from 'react-router-dom';

function ServerView() {

  const navigate = useNavigate()

  if (localStorage.getItem('username') === null) {
    navigate('/login')
  }

  const location = useLocation();
  console.log(location)
  const { data } = location.state

  return (
    <Container>
      <Card text="white" className="h-100" style={{ marginTop: 50 }}>
        <Card.Header style={{ backgroundColor: "#6D4E90" }}>Server 추가</Card.Header>
        <Card.Body>
          <Form>
            {/* 서버이름, os, hostname, ip, */}
            <Form.Group style={{color: 'black'}} controlId="name">
              <Form.Label>서버 이름</Form.Label>
              <Form.Control 
                type="text"
                disabled
                value={data.name}
              />
            </Form.Group>

            <Form.Group style={{color: 'black'}} controlId="hostname">
              <Form.Label>Hostname</Form.Label>
              <Form.Control 
                type="text"
                disabled
                value={data.hostname}
              />
            </Form.Group>

            <Form.Group style={{color: 'black'}} controlId="os">
              <Form.Label>OS</Form.Label>
              <Form.Control 
                type="text"
                disabled
                value={data.os}
              />
            </Form.Group>

            <Form.Group style={{color: 'black'}} controlId="ip">
              <Form.Label>IP</Form.Label>
              <Form.Control 
                type="text"
                disabled
                value={data.ip}
              />
            </Form.Group>

            <Form.Group style={{color: 'black'}} controlId="use_yn">
              <Form.Label>사용여부</Form.Label>
              <Form.Control 
                type="text"
                disabled
                value={data.use_yn === 'Y' ? '사용' : '미사용'}
              />
            </Form.Group>

            <ButtonGroup style={{marginTop: 50}}>
            <Button 
                style={{backgroundColor: '#6D4E90', borderColor: '#6D4E90'}}
                as={Link}
                to={`/server/edit/${data.id}`}
                state={{data: data}}
              >수정</Button>
              <Button 
                style={{backgroundColor: '#6D4E90', borderColor: '#6D4E90'}}
                as={Link}
                to="/server/list"
              >목록</Button>
            </ButtonGroup>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ServerView