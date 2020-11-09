import React from 'react';
import { Container, Navbar } from 'react-bootstrap'

const DefaultNavbar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Task management</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default DefaultNavbar;
