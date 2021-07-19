import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Toggle aria-controls="response-navbar-collapse"></Navbar.Toggle>
      <Navbar.Collapse id="response-navbar-collapse">
        <Nav className="me-auto container-fluid">
          <Nav.Link>
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link>
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
          <Navbar.Text className="ml-auto">
            {user.name} logged in
            <Button onClick={handleLogout}>logout</Button>
          </Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu