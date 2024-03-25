import { Container, Button, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/search");
  };

  return (
    <Navbar expand="lg" className="bg-black text-white">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" className="text-white text-decoration-none fs-4">
            NewsWave
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 d-flex justify-content-between gap-3"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav>
              <Link to="/" className="text-white text-decoration-none fs-6">
                General
              </Link>
            </Nav>
            <Nav>
              <Link
                to="/technology"
                className="text-white text-decoration-none fs-6"
              >
                Technology
              </Link>
            </Nav>
            <Nav>
              <Link
                to="/business"
                className="text-white text-decoration-none fs-6"
              >
                Business
              </Link>
            </Nav>

            <Nav>
              <Link
                to="/entertainment"
                className="text-white text-decoration-none fs-6"
              >
                Entertainment
              </Link>
            </Nav>

            <Nav>
              <Link
                to="/health"
                className="text-white text-decoration-none fs-6"
              >
                Health
              </Link>
            </Nav>
          </Nav>
          <Button variant="outline-primary" onClick={handleSearch}>
            Search
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
