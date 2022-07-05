import React, { useEffect, useState } from 'react';
import {
    Link, useNavigate
} from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';


function Header() {

    const logoutBtn = () => {
      if(localStorage.getItem('username') !== null){
        return <Nav.Link onClick={handleLogoutClick}>Logout</Nav.Link>
      }
    }

    const handleLogoutClick = () => {
      localStorage.clear()
      window.location.replace('/login')
    }

    return ( 
        <Navbar style={{backgroundColor: '#4D2C73'}} variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">Server-Monitoring</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/server/list">Server</Nav.Link>
                    {/* <Nav.Link as={Link} to="/login">Logout</Nav.Link> */}
                    {logoutBtn()}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;