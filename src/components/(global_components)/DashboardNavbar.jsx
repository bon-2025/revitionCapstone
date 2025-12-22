import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Image } from "react-bootstrap";
import "./DashboardNavbar.css"; // Make sure to import the CSS below

export default function DashboardNavbar({ user, navItems, onProfileClick, onLogout }) {
  // Default profile picture URL
  const defaultProfilePic = "https://placehold.co/80x80?text=User&bg=6c757d&color=fff";

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand as={NavLink} to="/dashboard">
          System Of Sanluis
        </Navbar.Brand>

        {/* Mobile toggler */}
        <Navbar.Toggle aria-controls="topNavMenu" />

        <Navbar.Collapse id="topNavMenu">
          {/* Navigation links */}
          <Nav className="me-auto mb-2 mb-lg-0">
            {navItems.map(item => (
              <Nav.Link as={NavLink} key={item.id} to={item.path}>
                {item.label}
              </Nav.Link>
            ))}
          </Nav>

          {/* Profile dropdown */}
          <Nav className="ms-auto align-items-center">
            <NavDropdown
              id="profile-dropdown"
              align="end"
              menuVariant="dark"
              className="no-caret"
              title={
                <div className="d-flex align-items-center gap-2">
                  <Image
                    src={user.profilePicture || defaultProfilePic}
                    roundedCircle
                    width={35}
                    height={35}
                    alt="Profile"
                  />
                  <span>{user.name} ({user.role})</span>
                </div>
              }
            >
              <NavDropdown.Item onClick={onProfileClick}>
                View Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={onLogout} className="text-danger">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
