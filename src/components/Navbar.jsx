import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ConnectWallet from "./ConnectWallet";
import NavDropdown from "react-bootstrap/NavDropdown";
const Navbars = () => {
  return (
    <Navbar expand="lg" variant="dark" className="hPosAbsolute">
      <Container style={{ background: "transparent" }}>
        <Navbar.Brand href="/">
          {" "}
          <span id="I" style={{fontSize:"26px"}}>🎃</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link eventKey={2} href="#memes">
              <ConnectWallet></ConnectWallet>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
