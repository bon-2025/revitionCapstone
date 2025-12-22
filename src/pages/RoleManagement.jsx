import { useEffect, useState } from "react";
import { Table, Card, Container, Row, Col, Form } from "react-bootstrap";
import { api } from "../utils/(common)/HttpApi";
import { ROLES } from "../app/config/roles";

export default function RoleManagement() {
  const [navItems, setNavItems] = useState([]);

  // Fetch existing nav items
  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const items = await api.get("/navItems");
        setNavItems(items);
      } catch (error) {
        console.error("Failed to fetch nav items:", error);
      }
    };
    fetchNavItems();
  }, []);

  // Toggle role assignment for a nav item
  const toggleRole = async (itemId, role) => {
    const item = navItems.find(i => i.id === itemId);
    if (!item) return;

    const updatedRoles = item.roles.includes(role)
      ? item.roles.filter(r => r !== role)
      : [...item.roles, role];

    try {
      await api.put(`/navItems/${itemId}`, { ...item, roles: updatedRoles });
      setNavItems(navItems.map(i => (i.id === itemId ? { ...i, roles: updatedRoles } : i)));
    } catch (error) {
      console.error("Failed to update roles:", error);
    }
  };

  return (
    <Container className="my-4">
      <Row className="mb-3">
        <Col>
          <h2 className="text-primary">Role Management</h2>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Nav Item</th>
                {Object.values(ROLES).map(role => (
                  <th key={role} className="text-center">{role.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {navItems.map(item => (
                <tr key={item.id}>
                  <td>{item.label}</td>
                  {Object.values(ROLES).map(role => (
                    <td key={role} className="text-center">
                      <Form.Check 
                        type="checkbox"
                        checked={item.roles.includes(role)}
                        onChange={() => toggleRole(item.id, role)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
