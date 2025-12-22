import React from "react";
import TextInput from "./TextInput";
import TextareaInput from "./TextareaInput";
import SelectInput from "./SelectInput";
import CheckboxInput from "./CheckboxInput";
import DateInput from "./DateInput";
import ButtonInput from "./ButtonInput";

/**
 * CustomField acts as a wrapper to dynamically render the correct input component
 * based on the "type" prop. This allows using a single component interface for
 * different types of form fields (text, textarea, select, checkbox, date, button, etc.).
 *
 * @param {Object} props - Props to pass down to the chosen input component
 * @param {string} props.type - Type of input to render ('text', 'textarea', 'select', 'checkbox', 'date', 'button', 'submit', etc.)
 * @returns {JSX.Element} The appropriate input component based on the type prop
 *
 * @example
 * <CustomField type="textarea" label="Description" />
 * <CustomField type="select" label="Category" options={optionsArray} />
 * <CustomField type="submit" buttonText="Save" />
 */
const CustomField = (props) => {
  switch (props.type) {
    case "textarea":
      return <TextareaInput {...props} />; // Multi-line text input
    case "select":
      return <SelectInput {...props} />;   // Dropdown/select input
    case "checkbox":
      return <CheckboxInput {...props} />; // Checkbox input
    case "date":
      return <DateInput {...props} />;     // Date picker input
    case "submit":
    case "button":
      return <ButtonInput {...props} />;   // Button input
    default:
      return <TextInput {...props} />;     // Default to single-line text input
  }
};

export default CustomField;
