import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function OurNavbar({darkMode}) {
  let bg = "light";
  let variant = "light";
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  if (darkMode === "on" ||  prefersDarkScheme.matches) {
    bg = "dark";
    variant = "dark";
  }

  return (
    <Navbar bg={bg} variant={variant} expand="md" className="mb-2">
      <Container>
        <Navbar.Brand as={Link} to="/">Todo+</Navbar.Brand>
        <Navbar.Toggle aria-controls="todo-nav" />
        <Navbar.Collapse id="todo-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default OurNavbar;