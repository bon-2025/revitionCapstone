import React from "react";

export default function DynamicForm({
  formData,
  setFormData,
  formFields,
  filteredAreas = [],
  availableLots = [],
  isLotAvailable = () => true,
  editingId = null,
  onSubmit
}) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      {formFields.map((field) => {
        const { name, label, type, required, options } = field;

        if (type === "select") {
          let selectOptions = options;

          if (name === "areaId") selectOptions = filteredAreas;
          if (name === "lotNumber") {
            selectOptions = availableLots.map((lot) => ({
              value: lot,
              label: `${lot} ${
                !isLotAvailable(formData.areaId, lot, editingId)
                  ? "(Taken)"
                  : "(Available)"
              }`,
            }));
          }

          return (
            <label key={name}>
              {label}:
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                disabled={!selectOptions.length}
              >
                <option value="">Select</option>
                {selectOptions.map((opt) => (
                  <option
                    key={opt.id ?? opt.value}
                    value={opt.id ?? opt.value}
                    disabled={opt.disabled}
                  >
                    {opt.name ?? opt.label}
                  </option>
                ))}
              </select>
            </label>
          );
        }

        if (type === "textarea") {
          return (
            <label key={name}>
              {label}:
              <textarea name={name} value={formData[name]} onChange={handleChange} />
            </label>
          );
        }

        // default input
        return (
          <label key={name}>
            {label}:
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required={required}
            />
          </label>
        );
      })}

      <button type="submit">{editingId ? "Update" : "Register"}</button>
    </form>
  );
}
