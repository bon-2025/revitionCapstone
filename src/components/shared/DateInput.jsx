import React from "react";

const DateInput = ({ label, id, register, error, ...rest }) => (
  <label className="d-block mb-3">
    {label}:
    <input
      id={id}
      type="date"
      {...register}
      className={`form-control ${error ? "is-invalid" : ""}`}
      {...rest}
    />
    {error && <div className="invalid-feedback">{error.message}</div>}
  </label>
);

export default DateInput;
