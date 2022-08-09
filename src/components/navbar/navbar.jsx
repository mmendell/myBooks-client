import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export function NavBar(props)
{
  return(
    <NavBar>
      <NavBar.Brand href='#Home'>myBooks</NavBar.Brand>
      <Nav classname='me-auto'>
        <Nav.Link href='#Profile-View'>My Account</Nav.Link>
        <Nav.Link href='#Sign-out'>Sign out</Nav.Link>
        <Nav.Link href='#Sign-up'>Sign up</Nav.Link>
      </Nav>
    </NavBar>
    );
};