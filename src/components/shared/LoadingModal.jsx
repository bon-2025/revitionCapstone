import { Modal, Spinner } from "react-bootstrap";

/**
 * LoadingModal component displays a centered modal with a spinner and optional message.
 * Useful for indicating loading state during async operations.
 *
 * @param {Object} props - Component props
 * @param {boolean} [props.loading=false] - Controls visibility of the modal
 * @param {string} [props.content="Please wait..."] - Message displayed below the spinner
 * @param {'sm' | 'md' | 'lg'} [props.spinnerSize="md"] - Size of the spinner
 * @param {string} [props.spinnerVariant="primary"] - Bootstrap variant color of the spinner
 *
 * @returns {JSX.Element} A modal with a spinner and optional message
 */
const LoadingModal = ({
  loading = false,
  content = "Please wait...",
  spinnerSize = "md",       // Spinner size: 'sm', 'md', 'lg'
  spinnerVariant = "primary" // Bootstrap color variant
}) => {
  return (
    <Modal
      show={loading}            // Show/hide modal based on loading prop
      centered                  // Vertically center the modal
      backdrop="static"         // Prevent closing when clicking outside
      keyboard={false}          // Disable closing via keyboard (Escape)
      animation={true}          // Enable fade in/out animation
    >
      <Modal.Body className="text-center py-4">
        {/* Spinner for visual loading indication */}
        <Spinner
          animation="border"      // Spinner type: border animation
          role="status"           // Accessibility role
          variant={spinnerVariant} // Color variant
          size={spinnerSize}      // Size of the spinner
          className="mb-3"        // Margin bottom for spacing
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>

        {/* Loading message */}
        <div className="fw-semibold">{content}</div>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
