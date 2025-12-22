import { Link } from "react-router-dom";

export default function Contracts() {
  return (
    <div className="card p-3">
      <h2>Contracts</h2>

      <ul className="list-group">
        <li className="list-group-item">
          <Link to="C-001">Contract C-001</Link>
        </li>
        <li className="list-group-item">
          <Link to="C-002">Contract C-002</Link>
        </li>
      </ul>
    </div>
  );
}
