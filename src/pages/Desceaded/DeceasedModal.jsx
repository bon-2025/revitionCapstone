import { Modal, Row, Col, Card, Button } from "react-bootstrap";

export default function DeceasedModal({ show, onHide, data }) {
  if (!data) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Deceased Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="g-3">
          <Col md={6}>
            <Card className="p-3 shadow-sm mb-3">
              <h6 className="text-muted">Personal Info</h6>
              <p><strong>First Name:</strong> {data.first_name}</p>
              <p><strong>Last Name:</strong> {data.last_name}</p>
              <p><strong>Gender:</strong> {data.gender}</p>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="p-3 shadow-sm mb-3">
              <h6 className="text-muted">Death & Burial</h6>
              <p><strong>Date of Birth:</strong> {data.date_of_birth}</p>
              <p><strong>Date of Death:</strong> {data.date_of_death}</p>
              <p><strong>Cause of Death:</strong> {data.cause_of_death}</p>
              <p><strong>Burial Location:</strong> {data.burial_location}</p>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
