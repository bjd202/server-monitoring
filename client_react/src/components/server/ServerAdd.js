import axios from "axios";
import React, { useState } from "react";
import { Container, Card, Form, Button, ButtonGroup, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function ServerAdd() {

  const navigate = useNavigate()

  if (localStorage.getItem('username') === null) {
    navigate('/login')
  }

  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({os: 'Windows', use_yn: 'Y'})
  const [alertShow, setAlertShow] = useState(false)

  const handleChange = (e) => {
    const {id, value} = e.target
    
    setFormData({
      ...formData,
      [id]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    axios.post('http://localhost:4000/server/add', formData)
    .then(res => {
      console.log(res.data)

      if (res.data === 'duplicate') {
        setAlertShow(true)
      }else if(res.data === 'success'){

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
            <Form.Group style={{color: 'black'}} controlId="name">
              <Form.Label>서버 이름</Form.Label>
              <Form.Control 
                required
                type="text"
                onChange={handleChange}
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
              />
              <Form.Control.Feedback type="invalid">
                Hostname은 필수 값 입니다.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group style={{color: 'black'}} controlId="os">
              <Form.Label>OS</Form.Label>
              <Form.Select onChange={handleChange}>
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
              />
              <Form.Control.Feedback type="invalid">
                IP는 필수 값 입니다.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group style={{color: 'black'}} controlId="use_yn">
              <Form.Label>사용여부</Form.Label>
              <Form.Select onChange={handleChange}>
                <option value={'Y'}>사용</option>
                <option value={'N'}>미사용</option>
              </Form.Select>
            </Form.Group>

            <ButtonGroup style={{marginTop: 50}}>
              <Button type="submit" style={{backgroundColor: '#6D4E90', borderColor: '#6D4E90'}}>추가</Button>
              <Button 
                style={{backgroundColor: '#6D4E90', borderColor: '#6D4E90'}}
                as={Link}
                to="/server/list"
              >목록</Button>
            </ButtonGroup>
          </Form>
        </Card.Body>
      </Card>

      <CustomAlert
        show={alertShow}
        onHide={() => setAlertShow(false)}
      />
    </Container>
  );
}

function CustomAlert(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          알람
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>중복된 Hostname입니다.</h4>
        {/* <p>
          
        </p> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} style={{backgroundColor: 'rgb(109, 78, 144)'}}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ServerAdd;
