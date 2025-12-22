import { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Alert,
  Badge,
} from "react-bootstrap";
import { useAuth } from "../app/context/UserAuthContext";
import Button from "react-bootstrap/Button";

export default function ProfilePage() {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    bio: user.bio || "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Detect changes
  const hasChanges = useMemo(
    () =>
      formData.name !== user.name ||
      formData.phone !== user.phone ||
      formData.bio !== user.bio,
    [formData, user]
  );

  // Avatar initials
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      setError("Name is required.");
      return;
    }

    const updatedUser = {
      ...user,
      ...formData,
      updatedAt: new Date().toISOString(),
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={7} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              {/* Header */}
              <div className="d-flex align-items-center mb-4">
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                  style={{ width: 60, height: 60, fontSize: 22 }}
                >
                  {initials}
                </div>

                <div>
                  <h4 className="mb-1">{user.name}</h4>
                  <div className="d-flex gap-2">
                    <Badge bg="secondary" className="text-uppercase">
                      {user.role}
                    </Badge>
                    <Badge bg="success">Active</Badge>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {success && (
                <Alert variant="success">
                  ✅ Profile updated successfully!
                </Alert>
              )}

              {error && <Alert variant="danger">{error}</Alert>}

              {hasChanges && !success && (
                <Alert variant="warning" className="py-2">
                  ⚠️ You have unsaved changes
                </Alert>
              )}

              {/* Form */}
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    disabled
                  />
                  <Form.Text muted>
                    Email cannot be changed
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 555 123 4567"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us a little about yourself"
                  />
                </Form.Group>

                {/* Account Info */}
                <div className="text-muted small mb-3">
                  <div>Joined: {new Date(user.createdAt).toLocaleDateString()}</div>
                  {user.updatedAt && (
                    <div>
                      Last updated:{" "}
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    onClick={handleSave}
                    disabled={!hasChanges}
                  >
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
