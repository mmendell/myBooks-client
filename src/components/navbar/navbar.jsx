import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {BrowserRouter as Router, Routes, Route, Redirect, Link} from 'react-router-dom';

export function NavBar(props) {
  let user = localStorage.getItem('user');
  
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.open('/', '_self');
    props.onLoggedOut(user);
  };

  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };


  return (

    {isAuth() && (
      (user)
    )}
    
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
