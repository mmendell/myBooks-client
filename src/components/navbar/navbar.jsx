import React from 'react';
import {Navbar, Container, Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export function NavBar() {
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
    <Navbar collapseOnSelect expand="xxl" variant="dark">
      <Container>
        <Navbar.Brand className='navbar-logo' href='/'>
          myBooks
        </Navbar.Brand>
        <NavBar.Toggle aria-controls='responsive-navbar-nav' />
        <NavBar.Collapse id="responsives-navbar-nav">
          <Nav className='me-auto'>
            {isAuth() && (
              <Nav.Link as ={Link} to={`/users/${user}`}>
                {user}
              </Nav.Link>
            )}
            {isAuth() && (
              <Button className='logout' variant='link' onClick={handleLogOut}>
                Logout
              </Button>
            )}
            {!isAuth() && <Nav.Link href='/'>Sign In</Nav.Link>}
            {!isAuth() && <Nav.Link href='/register'>Register</Nav.Link>}
          </Nav>
        </NavBar.Collapse>
      </Container>
    </Navbar>
  );
};
