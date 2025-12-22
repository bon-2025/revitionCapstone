import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 fw-bold text-danger animate__animated animate__bounceIn">
        404
      </h1>
      <h2 className="mb-3 animate__animated animate__fadeInDown">
        Oops! Page Not Found
      </h2>
      <p className="mb-4 animate__animated animate__fadeIn">
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        className="btn btn-primary btn-lg animate__animated animate__fadeInUp"
        onClick={() => navigate("/")}
      >
        &larr; Back to Home
      </button>
    </div>
  );
}
