import React from "react";

const CheckboxInput = ({ label, id, register, error, checked, ...rest }) => (
  <div className="form-check mb-3">
    <input
      id={id}
      type="checkbox"
      {...register}
      className={`form-check-input ${error ? "is-invalid" : ""}`}
      checked={checked}
      {...rest}
    />
    <label className="form-check-label" htmlFor={id}>
      {label}
    </label>
    {error && <div className="invalid-feedback">{error.message}</div>}
  </div>
);

export default CheckboxInput;
