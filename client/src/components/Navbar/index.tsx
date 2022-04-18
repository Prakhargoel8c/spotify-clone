import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const index = () => {
  return (
    <Navbar bg="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="https://d5fx445wy2wpk.cloudfront.net/static/logo.svg"
            width="140"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default index;
