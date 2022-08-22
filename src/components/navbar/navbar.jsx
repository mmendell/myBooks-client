
import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
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

    <NavBar>
      <NavBar.Brand href='#Home'>myBooks</NavBar.Brand>
        <Nav.Link href='#Profile-View'>My Account</Nav.Link>
        <Nav.Link href='#Sign-out'>Sign out</Nav.Link>
        <Nav.Link href='#Sign-up'>Sign up</Nav.Link>
        <Nav className="me-auto">
        {isAuth() && (
          <Nav.Link as={Link} to={`/users/${user}`}>
          {user}
          </Nav.Link>
        )}
        {isAuth() && (
            <Button className="logout" variant="link" onClick={handleLogOut}>
              Logout
            </Button>
            )}
            {!isAuth() && <Nav.Link href="/">Sign in</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Sign up</Nav.Link>}
        
      </Nav>
    </NavBar>
  );
};
