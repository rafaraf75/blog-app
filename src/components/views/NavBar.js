import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Blog.app</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/categories">Categories</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            {/* później dołożymy inne linki, np. Add Post */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;