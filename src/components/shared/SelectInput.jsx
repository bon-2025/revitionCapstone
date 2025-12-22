import React from "react";

const SelectInput = ({ label, id, register, error, options = [], ...rest }) => (
  <label className="d-block mb-3">
    {label}:
    <select
      id={id}
      {...register}
      className={`form-select ${error ? "is-invalid" : ""}`}
      {...rest}
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <div className="invalid-feedback">{error.message}</div>}
  </label>
);

export default SelectInput;
