import { Outlet, NavLink } from "react-router-dom";
import { FaUserPlus, FaList, FaArchive } from "react-icons/fa";
import { Container, Navbar, Nav, Card } from "react-bootstrap";

export default function DmsLayout({ showArchived, setShowArchived }) {
  return (
    <>
      {/* Navigation Bar (not sticky) */}
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand className="fw-bold text-primary">
            Deceased Management
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="dms-navbar-nav" />
          <Navbar.Collapse id="dms-navbar-nav">
            <Nav className="ms-auto align-items-center gap-2">
              <NavLink
                to=""
                end
                className={({ isActive }) =>
                  `d-flex align-items-center gap-1 px-3 py-2 rounded text-decoration-none ${
                    isActive ? "bg-primary text-white fw-bold" : "text-dark"
                  }`
                }
              >
                <FaUserPlus />
                Register
              </NavLink>
              <NavLink
                to="list"
                className={({ isActive }) =>
                  `d-flex align-items-center gap-1 px-3 py-2 rounded text-decoration-none ${
                    isActive ? "bg-primary text-white fw-bold" : "text-dark"
                  }`
                }
              >
                <FaList />
                List
              </NavLink>

              {/* Archive toggle button */}
              <NavLink
                to="archive"
                className={({ isActive }) =>
                  `d-flex align-items-center gap-1 px-3 py-2 rounded text-decoration-none ${
                    isActive ? "bg-warning text-white fw-bold" : "text-dark"
                  }`
                }
              >
                <FaArchive />
                Archive
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container fluid className="p-4 bg-light" style={{ minHeight: "100vh" }}>
        <Card className="shadow-sm">
          <Card.Body>
            <Outlet />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
