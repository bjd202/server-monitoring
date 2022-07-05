import React, { useEffect, useState } from 'react'
import { 
    Container, 
    Row, 
    Col, 
    Card,
    ProgressBar,
} from 'react-bootstrap';
import '../css/server.monitoring.css'
import axios from 'axios'
import RealTimeBarChart from "./chart/RealTimeBarChart";
import RealTimeTable from './table/RealTimeTable'
import { useNavigate } from 'react-router-dom';


function Dashboard() {

  const navigate = useNavigate()

  if (localStorage.getItem('username') === null) {
    navigate('/login')
  }

  const [serverCount, setServerCount] = useState({use_y: 0, use_n: 0})
  const [osCount, setOsCount] = useState({
    windows: 0,
    linux: 0,
    unix: 0,
    others: 0
  })

  const [totalCores, setTotalCores] = useState(0)

  const [avgCpu, setAvgCpu] = useState(0)
  const [avgMemory, setAvgMemory] = useState(0)
  const [avgDisk, setAvgDisk] = useState(0)

  useEffect(() => {
    axios.post('http://localhost:4000/server/serverCount')
    .then(res => {
      console.log(res.data)
      setServerCount(res.data)
    })
    .catch(err => console.error(err))

    axios.post('http://localhost:4000/server/osCount')
    .then(res => {
      console.log(res.data)
      setOsCount(res.data)
    })
    .catch(err => console.error(err))

    axios.post('http://localhost:4000/cpu/findTotalCores')
    .then(res => {
        console.log(res.data)
        setTotalCores(res.data[0].totalCores)
    })
    .catch(err => console.error(err))

    axios.post('http://localhost:4000/cpuLoad/findAvgCpu')
    .then(res => {
        console.log(res.data)
        setAvgCpu(res.data[0].avgCpu)
    })
    .catch(err => console.error(err))

    axios.post('http://localhost:4000/memory/findAvgMemory')
    .then(res => {
        console.log(res.data)
        setAvgMemory(res.data[0].avgMem)
    })
    .catch(err => console.error(err))

    axios.post('http://localhost:4000/disk/findAvgDisk')
    .then(res => {
        console.log(res.data)
        setAvgDisk(res.data[0].avgDisk)
    })
    .catch(err => console.error(err))
  
    return () => {
      
    }
  }, [])

  return (
    <Container>
        <Row style={{paddingTop: 50, }}>
            <Col lg="2" md="6" xs="12">
                <Card text='white' className='h-100'>
                    <Card.Header style={{backgroundColor: '#6D4E90'}}>Servers</Card.Header>
                    <Card.Body style={{
                        backgroundColor: '#9078AD',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly'
                    }}>
                        <Card.Title style={{fontSize: 'calc(1.375rem + 1.5vw)'}} >{serverCount.use_y + serverCount.use_n}</Card.Title>
                        <Card.Text>
                            <ProgressBar variant='progress-bar-puple' now={serverCount.use_y} label={serverCount.use_y} max={serverCount.use_y + serverCount.use_n} />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg="2" md="6" xs="12">
                <Card text='white' className='h-100'>
                    <Card.Header style={{backgroundColor: '#6D4E90'}}>OS</Card.Header>
                    <Card.Body style={{
                        backgroundColor: '#9078AD',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly'
                    }}>
                        <Card.Title></Card.Title>
                        <Row>
                            <Col>
                                <Card.Subtitle style={{fontWeight: 'bold'}}>Windows</Card.Subtitle>
                                <Card.Text>{osCount.windows}</Card.Text>
                            </Col>
                            <Col>
                                <Card.Subtitle style={{fontWeight: 'bold'}}>Linux</Card.Subtitle>
                                <Card.Text>{osCount.linux}</Card.Text>
                            </Col>
                        </Row>
                        <Row style={{paddingTop: 20}}>
                            <Col>
                                <Card.Subtitle style={{fontWeight: 'bold'}}>Unix</Card.Subtitle>
                                <Card.Text>{osCount.unix}</Card.Text>
                            </Col>
                            <Col>
                                <Card.Subtitle style={{fontWeight: 'bold'}}>Others</Card.Subtitle>
                                <Card.Text>{osCount.others}</Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg="2" md="6" xs="12">
                <Card text='white' className='h-100'>
                    <Card.Header style={{backgroundColor: '#6D4E90'}}>Total Cores</Card.Header>
                    <Card.Body style={{backgroundColor: '#9078AD'}}>
                        <Card.Title></Card.Title>
                        <Card.Text>{totalCores}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg="2" md="6" xs="12">
                <Card text='white' className='h-100'>
                    <Card.Header style={{backgroundColor: '#6D4E90'}}>Avg CPU</Card.Header>
                    <Card.Body style={{backgroundColor: '#9078AD'}}>
                        <Card.Title></Card.Title>
                        <Card.Text>{avgCpu}%</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg="2" md="6" xs="12">
                <Card text='white' className='h-100'>
                    <Card.Header style={{backgroundColor: '#6D4E90'}}>Avg Memmory</Card.Header>
                    <Card.Body style={{backgroundColor: '#9078AD'}}>
                        <Card.Title></Card.Title>
                        <Card.Text>{avgMemory}%</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg="2" md="6" xs="12">
                <Card text='white' className='h-100'>
                    <Card.Header style={{backgroundColor: '#6D4E90'}}>Avg Disk</Card.Header>
                    <Card.Body style={{backgroundColor: '#9078AD'}}>
                        <Card.Title></Card.Title>
                        <Card.Text>{avgDisk}%</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        
        <Row style={{paddingTop: 30}}>
            <Col lg="4" md="12" xs="12">
                <Card text='white' className='h-100'>
                    <Card.Header style={{backgroundColor: '#6D4E90'}}>CPU Top 5</Card.Header>
                    <Card.Body style={{backgroundColor: ''}}>
                        {/* <Chart
                            options={options.options}
                            series={options.series}
                            type="bar"
                        /> */}
                        <RealTimeBarChart type={'cpu'} />
                    </Card.Body>
                </Card>
            </Col>
            <Col lg="4" md="12" xs="12">
                <Card text='white' className='h-100'>
                    <Card.Header style={{backgroundColor: '#6D4E90'}}>Memory Top 5</Card.Header>
                    <Card.Body style={{backgroundColor: ''}}>
                        {/* <Chart
                            options={options.options}
                            series={options.series}
                            type="bar"
                        /> */}
                        <RealTimeBarChart type={'memory'} />
                    </Card.Body>
                </Card>
            </Col>
            <Col lg="4" md="12" xs="12">
                <Card text='white' className='h-100'>
                    <Card.Header style={{backgroundColor: '#6D4E90'}}>Disk Top 5</Card.Header>
                    <Card.Body style={{backgroundColor: ''}}>
                        {/* <Chart
                            options={options.options}
                            series={options.series}
                            type="bar"
                        /> */}
                        <RealTimeBarChart type={'disk'} />
                    </Card.Body>
                </Card>
                
            </Col>
        </Row>

        <Row style={{paddingTop: 30}}>
            <Col lg="6" md="12" xs="12">
                <Card text='white' className='h-100'>
                    <Card.Header style={{backgroundColor: '#6D4E90'}}>Process CPU Top 5</Card.Header>
                    <Card.Body style={{backgroundColor: ''}}>
                        <RealTimeTable type={'cpu'} />
                    </Card.Body>
                </Card>
            </Col>
            <Col lg="6" md="12" xs="12">
                <Card text='white' className='h-100'>
                    <Card.Header style={{backgroundColor: '#6D4E90'}}>Process Memory Top 5</Card.Header>
                    <Card.Body style={{backgroundColor: ''}}>
                        <RealTimeTable type={'memory'} />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        
    </Container>
  )
}

export default Dashboard