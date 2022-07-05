import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Table, Card, ButtonGroup, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import '../../css/server.monitoring.css';

function ServerList() {

  const navigate = useNavigate()

  if (localStorage.getItem('username') === null) {
    navigate('/login')
  }

  const [data, setData] = useState([])
  const [refreshTime, setRefreshTime] = useState(60)
  const [btnText, setBtnText] = useState("1분")

  useEffect(() => {
    const interval = startInterval(1000 * refreshTime)

    return () => {
      clearInterval(interval)
    }
  }, [refreshTime])

  const startInterval = (time) => {
    getServerList()

    return setInterval(getServerList, time)
  }

  const getServerList = () => {
    axios.post('http://localhost:4000/server/findAll')
    .then(res => {
      console.log(res.data)
      setData(res.data)
    })
    .catch(err => console.error(err))
  }
  
  const handleRefresh = () => {
    getServerList()
  }

  const handleClickRefreshTime = (e) => {
    const { text } = e.target
    setBtnText(text)
    setRefreshTime(60 * parseInt(text.split('')[0]))
  }

  // const handleClick = (e, id) => {
  //   navigate(`/server/view/${id}`)
  // }

  function handleClick(value) {
    console.log(value)
    navigate(`/server/view/${value.id}`, {state: {data: value}})
  }

  return (
    <Container>
      <Card text="white" className="h-100" style={{marginTop: 50}}>
        <Card.Header style={{ backgroundColor: "#6D4E90" }}>
          <ButtonGroup>
            <Button style={{backgroundColor: '#9078AD', borderColor: '#9078AD'}} as={Link} to="/server/add">추가</Button>
            <DropdownButton as={ButtonGroup} title="갱신 주기" className="droupdown-btn-puple" >
              <Dropdown.Item onClick={handleClickRefreshTime}>1분</Dropdown.Item>
              <Dropdown.Item onClick={handleClickRefreshTime}>5분</Dropdown.Item>
              <Dropdown.Item onClick={handleClickRefreshTime}>10분</Dropdown.Item>
            </DropdownButton>
            <Button style={{backgroundColor: '#9078AD', borderColor: '#9078AD'}}>{btnText}</Button>
            <Button onClick={handleRefresh} style={{backgroundColor: '#9078AD', borderColor: '#9078AD'}}>새로고침</Button>
          </ButtonGroup>
        </Card.Header>
        <Card.Body style={{ backgroundColor: "" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>상태</th>
                <th>서버 이름</th>
                <th>CPU(%)</th>
                <th>Memory Used(%)</th>
                <th>Disk Used(%)</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, index) => {
                if (value.id === null) {
                  return(
                    <tr key={index}></tr>
                  )
                }

                return (
                  <tr key={index} onClick={() => (handleClick(value))}>
                    <td></td>
                    <td>{value.name}</td>
                    <td>{value.currentLoad}</td>
                    <td>{value.mem_used}</td>
                    <td>{value.disk_used}</td>
                    <td>{value.ip}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ServerList;
