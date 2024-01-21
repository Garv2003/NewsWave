import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="px-3"
    >
      <Navbar.Brand>
        <Link to="/" className="navbar-brand">
          NewsWave
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-between"
      >
        <Nav>
          <Link to="/business" className="nav-link">
            Business
          </Link>
          <Link to="/entertainment" className="nav-link">
            Entertainment
          </Link>
          <Link to="/general" className="nav-link">
            General
          </Link>
          <Link to="/health" className="nav-link">
            Health
          </Link>
          <Link to="/science" className="nav-link">
            Science
          </Link>
          <Link to="/sports" className="nav-link">
            Sports
          </Link>
          <Link to="/technology" className="nav-link">
            Technology
          </Link>
        </Nav>
        <Nav className="">
          <Link to="/login" className="nav-link">
            <Button>Login</Button>
          </Link>
          <Link to="/signup" className="nav-link">
            <Button>Signup</Button>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
