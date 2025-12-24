import { useState, useMemo } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import {
  FaUndo,
  FaEye,
  FaFileContract,
  FaTrashAlt,
} from "react-icons/fa";

const MOCK_DECEASED = [
  { id: 3, first_name: "Michael", last_name: "Johnson", archived: true },
  { id: 4, first_name: "Emily", last_name: "Brown", archived: true },
];

const MOCK_CONTRACTS = {
  3: [],
  4: [{ id: 1, type: "Memorial Service", date: "2024-02-05" }],
};

export default function DeceasedArchiveList() {
  const [records, setRecords] = useState(MOCK_DECEASED);
  const [contracts, setContracts] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return records.filter(r =>
      `${r.first_name} ${r.last_name}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [records, search]);

  /* ================= ACTIONS ================= */

  // 🔄 Restore record
  const handleRetrieve = id => {
    setRecords(prev => prev.filter(r => r.id !== id));
    alert("Record restored to active list");
  };

  // 👁 View details
  const handleView = record => setViewData(record);

  // 📄 View contracts
  const handleViewContracts = id =>
    setContracts(MOCK_CONTRACTS[id] || []);

  // ❌ Permanent delete (optional)
  const handlePermanentDelete = id => {
    if (window.confirm("Permanently delete this record?")) {
      setRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  /* =========================================== */

  return (
    <div className="mt-3">
      <Form.Control
        placeholder="Search archived records"
        className="mb-3"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ maxWidth: 300 }}
      />

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">
                No archived records
              </td>
            </tr>
          ) : (
            filtered.map(r => (
              <tr key={r.id}>
                <td>{r.first_name}</td>
                <td>{r.last_name}</td>
                <td className="d-flex flex-wrap gap-2">
                  <Button size="sm" variant="success" onClick={() => handleRetrieve(r.id)}>
                    <FaUndo className="me-1" />
                    Retrieve
                  </Button>

                  <Button size="sm" variant="info" onClick={() => handleView(r)}>
                    <FaEye className="me-1" />
                    View
                  </Button>

                  <Button size="sm" variant="warning" onClick={() => handleViewContracts(r.id)}>
                    <FaFileContract className="me-1" />
                    Contracts
                  </Button>

                  <Button size="sm" variant="danger" onClick={() => handlePermanentDelete(r.id)}>
                    <FaTrashAlt className="me-1" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* VIEW MODAL */}
      <Modal show={!!viewData} onHide={() => setViewData(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Archived Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewData && (
            <>
              <p><strong>Name:</strong> {viewData.first_name} {viewData.last_name}</p>
              <p>Status: Archived</p>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* CONTRACTS MODAL */}
      <Modal show={!!contracts} onHide={() => setContracts(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Contract History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contracts?.length ? (
            <ul>
              {contracts.map(c => (
                <li key={c.id}>{c.type} - {c.date}</li>
              ))}
            </ul>
          ) : (
            <p>No contracts available</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
