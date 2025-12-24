import { useState, useMemo } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import DeceasedModal from "./DeceasedModal";
import {
  FaEye,
  FaArchive,
  FaEdit,
  FaFileContract,
  FaPlusCircle,
} from "react-icons/fa";


// Mock data
const MOCK_DECEASED = [
  { id: 1, first_name: "John", last_name: "Doe", date_of_birth: "1970-01-01", date_of_death: "2023-11-15", gender: "Male", cause_of_death: "Natural", burial_location: "Greenwood Cemetery", archived: false },
  { id: 2, first_name: "Jane", last_name: "Smith", date_of_birth: "1985-06-12", date_of_death: "2024-01-20", gender: "Female", cause_of_death: "Accident", burial_location: "Oakwood Memorial", archived: false },
  { id: 3, first_name: "Michael", last_name: "Johnson", date_of_birth: "1960-03-22", date_of_death: "2023-12-05", gender: "Male", cause_of_death: "Illness", burial_location: "Hillside Cemetery", archived: true },
  { id: 4, first_name: "Emily", last_name: "Brown", date_of_birth: "1990-09-08", date_of_death: "2024-02-11", gender: "Female", cause_of_death: "Natural", burial_location: "Forest Lawn", archived: true },
];

// Mock contract history
const MOCK_CONTRACTS = {
  1: [{ id: 1, type: "Funeral", date: "2023-11-10" }],
  2: [{ id: 2, type: "Insurance", date: "2024-01-10" }],
  3: [],
  4: [{ id: 3, type: "Memorial Service", date: "2024-02-05" }],
};

export default function DeceasedListMock() {
  const [records, setRecords] = useState(MOCK_DECEASED);
  const [modalData, setModalData] = useState(null);
  const [contractsData, setContractsData] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Only active records for this list
  const filteredRecords = useMemo(() => {
    return records
      .filter(r => !r.archived)
      .filter(r =>
        r.first_name.toLowerCase().includes(search.toLowerCase()) ||
        r.last_name.toLowerCase().includes(search.toLowerCase())
      );
  }, [records, search]);

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Actions
  const handleArchive = id => setRecords(prev => prev.map(r => r.id === id ? { ...r, archived: true } : r));
  const handleDelete = id => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setRecords(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleViewContracts = id => {
    setContractsData(MOCK_CONTRACTS[id] || []);
  };

  return (
    <div className="mt-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Control
          type="text"
          placeholder="Search by first or last name"
          value={search}
          onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
          style={{ maxWidth: 300 }}
        />
      </div>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Death</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRecords.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-3">No records found</td>
            </tr>
          ) : (
            paginatedRecords.map(r => (
              <tr key={r.id}>
                <td>{r.first_name}</td>
                <td>{r.last_name}</td>
                <td>{r.date_of_death}</td>
                <td className="d-flex flex-wrap gap-2">
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => setModalData(r)}
                  >
                    <FaEye className="me-1" />
                    View
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleArchive(r.id)}
                  >
                    <FaArchive className="me-1" />
                    Archive
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEdit(r)}
                  >
                    <FaEdit className="me-1" />
                    Edit
                  </Button>

                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleViewContracts(r.id)}
                  >
                    <FaFileContract className="me-1" />
                    Contracts
                  </Button>

                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleExtendContract(r.id)}
                  >
                    <FaPlusCircle className="me-1" />
                    Extend
                  </Button>
                </td>

              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between mt-2">
          <Button size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
        </div>
      )}

      {/* Deceased Modal */}
      <DeceasedModal show={!!modalData} onHide={() => setModalData(null)} data={modalData} />

      {/* Contracts Modal */}
      <Modal show={!!contractsData} onHide={() => setContractsData(null)} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Contract History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contractsData && contractsData.length > 0 ? (
            <ul>
              {contractsData.map(c => (
                <li key={c.id}>{c.type} - {c.date}</li>
              ))}
            </ul>
          ) : (
            <p>No contract history available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setContractsData(null)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
