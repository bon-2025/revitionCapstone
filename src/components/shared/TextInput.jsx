import React from "react";

/**
 * TextInput - Reusable text input component with label, validation, and error display.
 * Can be used as a single-line input field for forms, fully compatible with React Hook Form (RHF).
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Label text displayed above the input
 * @param {string} props.id - Unique ID for the input element
 * @param {Object} props.register - RHF register object for controlled form input
 * @param {Object} props.error - Validation error object from RHF (optional)
 * @param {string} props.placeholder - Placeholder text for the input
 * @param {string} [props.type='text'] - Input type (text, email, password, etc.)
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {...Object} rest - Any other props to pass to the input element
 *
 * @returns {JSX.Element} A text input with label and optional error message
 *
 * @example
 * <TextInput
 *   label="Email"
 *   id="email"
 *   placeholder="Enter your email"
 *   register={register("email")}
 *   error={errors.email}
 * />
 */
const TextInput = ({ label, id, register, error, placeholder, type = "text", className = "", ...rest }) => {
  return (
    <div className="mb-3">
      {/* Render label if provided */}
      {label && <label htmlFor={id} className="form-label">{label}</label>}

      {/* Input field */}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        className={`form-control ${className} ${error ? "is-invalid" : ""}`} // Add Bootstrap error class if validation fails
        {...rest}
      />

      {/* Display validation error message if exists */}
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

export default TextInput;
