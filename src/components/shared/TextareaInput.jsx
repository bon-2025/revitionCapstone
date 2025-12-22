import React from "react";

const TextareaInput = ({ label, id, register, error, placeholder, ...rest }) => (
  <label className="d-block mb-3">
    {label}:
    <textarea
      id={id}
      placeholder={placeholder}
      {...register}
      className={`form-control ${error ? "is-invalid" : ""}`}
      {...rest}
    />
    {error && <div className="invalid-feedback">{error.message}</div>}
  </label>
);

export default TextareaInput;
