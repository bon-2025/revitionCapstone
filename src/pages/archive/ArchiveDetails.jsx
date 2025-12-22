import { useParams } from "react-router-dom";

export default function ArchiveDetails() {
  const { id } = useParams();

  return (
    <div className="card p-3">
      <h3>Archive Details</h3>
      <p>
        <strong>Archive ID:</strong> {id}
      </p>
    </div>
  );
}
