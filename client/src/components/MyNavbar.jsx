import { useNavigate } from 'react-router-dom';
import { Navbar, Container } from "react-bootstrap";

export function MyNavbar() {
  const navigate = useNavigate();
  return (
    <Navbar bg="primary" variant="dark">
      <Container fluid>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-between">
          <div className="mx-auto text-center">
            <h1 className="site-title">Office Queue Management System</h1>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default MyNavbar;
