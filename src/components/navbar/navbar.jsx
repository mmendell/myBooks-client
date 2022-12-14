import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbar.scss';

export function NavBar() {
  const user = localStorage.getItem('user');

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    localStorage.removeItem('token');
    window.open('/', '_self');
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
        <Navbar.Brand className="navbar-logo" href="/">
          myBooks
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, { setUser })(NavBar);
