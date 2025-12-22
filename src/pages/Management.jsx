import { useState, useEffect } from "react";

// Cemetery and area data
const cemeteries = [
  { id: 1, name: "Greenwood Cemetery" },
  { id: 2, name: "Peaceful Rest Cemetery" },
];

const areas = [
  { id: 1, cemeteryId: 1, name: "Section A", availableLots: [1, 2, 3] },
  { id: 2, cemeteryId: 1, name: "Section B", availableLots: [4, 5] },
  { id: 3, cemeteryId: 2, name: "Section C", availableLots: [1, 2] },
];

// ----- DynamicForm Component -----
function DynamicForm({
  formData,
  setFormData,
  formFields,
  filteredAreas,
  availableLots,
  isLotAvailable,
  editingId,
  onSubmit
}) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      {formFields.map((field) => {
        const { name, label, type, required, options } = field;

        if (type === "select") {
          let selectOptions = options;

          if (name === "areaId") selectOptions = filteredAreas;
          if (name === "lotNumber")
            selectOptions = availableLots.map((lot) => ({
              value: lot,
              label: `${lot} ${!isLotAvailable(formData.areaId, lot, editingId) ? "(Taken)" : "(Available)"}`,
            }));

          return (
            <label key={name}>
              {label}:
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                disabled={!selectOptions.length}
              >
                <option value="">Select</option>
                {selectOptions.map((opt) => (
                  <option key={opt.id ?? opt.value} value={opt.id ?? opt.value} disabled={opt.disabled}>
                    {opt.name ?? opt.label}
                  </option>
                ))}
              </select>
            </label>
          );
        }

        if (type === "textarea") {
          return (
            <label key={name}>
              {label}:
              <textarea name={name} value={formData[name]} onChange={handleChange} />
            </label>
          );
        }

        // default input
        return (
          <label key={name}>
            {label}:
            <input type={type} name={name} value={formData[name]} onChange={handleChange} required={required} />
          </label>
        );
      })}

      <button type="submit">{editingId ? "Update" : "Register"}</button>
    </form>
  );
}

// ----- Management Page -----
export default function Management() {
  const [registrations, setRegistrations] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    dateOfDeath: "",
    gender: "",
    cemeteryId: "",
    areaId: "",
    lotNumber: "",
    notes: "",
  });
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [availableLots, setAvailableLots] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [viewingRecord, setViewingRecord] = useState(null);

  const formFields = [
    { name: "fullName", label: "Full Name", type: "text", required: true },
    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
    { name: "dateOfDeath", label: "Date of Death", type: "date", required: true },
    { 
      name: "gender", 
      label: "Gender", 
      type: "select", 
      options: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Other", label: "Other" }
      ] 
    },
    { name: "cemeteryId", label: "Cemetery", type: "select", options: cemeteries, required: true },
    { name: "areaId", label: "Area / Section", type: "select", required: true },
    { name: "lotNumber", label: "Lot Number", type: "select", required: true },
    { name: "notes", label: "Notes", type: "textarea" },
  ];

  // --- Effects for dynamic selects ---
  useEffect(() => {
    if (formData.cemeteryId) {
      const filtered = areas.filter((a) => a.cemeteryId === parseInt(formData.cemeteryId));
      setFilteredAreas(filtered);
      setFormData((prev) => ({ ...prev, areaId: "", lotNumber: "" }));
      setAvailableLots([]);
    }
  }, [formData.cemeteryId]);

  useEffect(() => {
    if (formData.areaId) {
      const area = areas.find((a) => a.id === parseInt(formData.areaId));
      setAvailableLots(area.availableLots);
      setFormData((prev) => ({ ...prev, lotNumber: "" }));
    }
  }, [formData.areaId]);

  // --- Helper ---
  const isLotAvailable = (areaId, lotNumber, excludeId = null) => {
    return !registrations.some(
      (r) =>
        r.areaId === parseInt(areaId) &&
        r.lotNumber === parseInt(lotNumber) &&
        !r.archived &&
        r.id !== excludeId
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.lotNumber) return alert("Select a lot.");
    if (!isLotAvailable(formData.areaId, formData.lotNumber, editingId)) return alert("Lot already taken!");

    if (editingId) {
      setRegistrations((prev) =>
        prev.map((r) => (r.id === editingId ? { ...r, ...formData } : r))
      );
      setEditingId(null);
      alert("Updated successfully!");
    } else {
      const newRecord = { ...formData, id: Date.now(), archived: false, leaseYear: 5 };
      setRegistrations((prev) => [...prev, newRecord]);
      alert("Registered successfully!");
    }

    setFormData({ fullName: "", dateOfBirth: "", dateOfDeath: "", gender: "", cemeteryId: "", areaId: "", lotNumber: "", notes: "" });
    setFilteredAreas([]);
    setAvailableLots([]);
  };

  const archive = (id) => setRegistrations(registrations.map(r => r.id === id ? { ...r, archived: true } : r));
  const extend = (id) => {
    const years = parseInt(prompt("Enter additional years to extend:", "1"));
    if (!isNaN(years)) setRegistrations(registrations.map(r => r.id === id ? { ...r, leaseYear: r.leaseYear + years } : r));
  };
  const edit = (id) => {
    const record = registrations.find(r => r.id === id);
    setFormData({ ...record });
    setEditingId(id);
  };
  const viewDetails = (id) => setViewingRecord(registrations.find(r => r.id === id));

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Cemetery Management</h2>

      <div style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)", padding: 20, borderRadius: 8, marginBottom: 30 }}>
        <h3>{editingId ? "Edit Registration" : "Register Deceased Person"}</h3>
        <DynamicForm
          formData={formData}
          setFormData={setFormData}
          formFields={formFields}
          filteredAreas={filteredAreas}
          availableLots={availableLots}
          isLotAvailable={isLotAvailable}
          editingId={editingId}
          onSubmit={handleSubmit}
        />
      </div>

      <div>
        <h3>All Registrations</h3>
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Cemetery</th>
              <th>Area</th>
              <th>Lot</th>
              <th>Lease Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => {
              const cemeteryName = cemeteries.find(c => c.id === r.cemeteryId)?.name;
              const areaName = areas.find(a => a.id === r.areaId)?.name;
              return (
                <tr key={r.id}>
                  <td>{r.fullName}</td>
                  <td>{cemeteryName}</td>
                  <td>{areaName}</td>
                  <td>{r.lotNumber}</td>
                  <td>{r.leaseYear}</td>
                  <td>{r.archived ? "Archived" : "Active"}</td>
                  <td>
                    {!r.archived && <button onClick={() => archive(r.id)}>Archive</button>}
                    <button onClick={() => extend(r.id)}>Extend</button>
                    <button onClick={() => edit(r.id)}>Edit</button>
                    <button onClick={() => viewDetails(r.id)}>View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {viewingRecord && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{ background: "#fff", padding: 20, borderRadius: 8, width: 400 }}>
            <h3>Registration Details</h3>
            <p><strong>Name:</strong> {viewingRecord.fullName}</p>
            <p><strong>Date of Birth:</strong> {viewingRecord.dateOfBirth}</p>
            <p><strong>Date of Death:</strong> {viewingRecord.dateOfDeath}</p>
            <p><strong>Gender:</strong> {viewingRecord.gender}</p>
            <p><strong>Cemetery:</strong> {cemeteries.find(c => c.id === viewingRecord.cemeteryId)?.name}</p>
            <p><strong>Area:</strong> {areas.find(a => a.id === viewingRecord.areaId)?.name}</p>
            <p><strong>Lot:</strong> {viewingRecord.lotNumber}</p>
            <p><strong>Notes:</strong> {viewingRecord.notes}</p>
            <p><strong>Lease Year:</strong> {viewingRecord.leaseYear}</p>
            <p><strong>Status:</strong> {viewingRecord.archived ? "Archived" : "Active"}</p>
            <button onClick={() => setViewingRecord(null)} style={{ marginTop: 10 }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
