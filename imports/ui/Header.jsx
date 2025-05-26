import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from "meteor/roles";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  const logout = () => {
    Meteor.logout();
  };

  return (
    <Navbar className="bg-body-secondary" expand="lg">
      <Navbar.Brand href="/">Dealer Logistics</Navbar.Brand>
      <Container>

        <Nav className="me-auto">
          <Nav.Link href="/cars">Cars</Nav.Link>
          <Nav.Link href="/shuttle">Shuttle</Nav.Link>
          <Nav.Link href="/tasks">Tasks</Nav.Link>
          {Roles.userIsInRole(Meteor.user(), 'admin') ? (
            <Nav.Link href="/admin">Admin</Nav.Link>
          ) : null}
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown title={`Signed in as: ${Meteor.user()?.username}`} id="basic-nav-dropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;