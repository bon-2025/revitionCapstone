import { useParams } from "react-router-dom";

export default function ContractDetails() {
  const { id } = useParams();

  return (
    <div className="card p-3">
      <h3>Contract Details</h3>
      <p>
        <strong>Contract ID:</strong> {id}
      </p>
    </div>
  );
}
