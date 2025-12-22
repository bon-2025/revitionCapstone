import React from "react";
import CustomField from "../shared/CustomField";
import LoadingModal from "../shared/LoadingModal";

/**
 * Form - Reusable form component controlled via React Hook Form (RHF) props.
 * Renders multiple input fields dynamically and shows a loading modal during submission.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.fields - Array of field configurations. Each field should have at least a `name` and `type`.
 * @param {function} props.register - RHF `register` function for controlled inputs
 * @param {Object} props.errors - RHF errors object to display field validation errors
 * @param {function} props.handleSubmit - RHF handleSubmit function for form submission
 * @param {boolean} props.loading - Flag to show the loading modal during async operations
 *
 * @returns {JSX.Element} A dynamically rendered form with loading modal
 *
 * @example
 * <Form
 *   fields={[
 *     { name: "email", type: "text", label: "Email" },
 *     { name: "password", type: "password", label: "Password" },
 *     { name: "submit", type: "submit", buttonText: "Login" }
 *   ]}
 *   register={register}
 *   errors={errors}
 *   handleSubmit={handleSubmit(onSubmit)}
 *   loading={isSubmitting}
 * />
 */
export default function Form({ fields = [], register, errors, handleSubmit, loading }) {
  return (
    <>
      {/* Loading modal displayed during form submission */}
      <LoadingModal loading={loading} content="Processing, please wait..." />

      {/* Main form element */}
      <form onSubmit={handleSubmit} noValidate>
        {fields.map((field) =>
          field.name && (
            <CustomField
              key={field.name}
              {...field}
              // Register the field with RHF unless it's a button/submit
              register={field.type !== "submit" && field.type !== "button" ? register(field.name) : undefined}
              // Pass validation error for the field if exists
              error={errors[field.name]}
            />
          )
        )}
      </form>
    </>
  );
}
