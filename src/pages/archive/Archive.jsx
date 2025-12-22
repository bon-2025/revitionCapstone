import { Link } from "react-router-dom";

export default function Archive() {
  return (
    <div className="card p-3">
      <h2>Archive</h2>

      <ul className="list-group">
        <li className="list-group-item">
          <Link to="A-001">Archived Item A-001</Link>
        </li>
        <li className="list-group-item">
          <Link to="A-002">Archived Item A-002</Link>
        </li>
      </ul>
    </div>
  );
}
