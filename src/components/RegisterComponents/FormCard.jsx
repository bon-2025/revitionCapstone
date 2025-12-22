import { Card, Form } from "react-bootstrap";

const FormCard = ({ title, fields, data, errors, onChange }) => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3">{title}</Card.Title>

        {fields.map((field) => (
          <Form.Group className="mb-3" key={field.name}>
            <Form.Label>{field.label}</Form.Label>

            {field.type === "select" ? (
              <Form.Select
                name={field.name}
                value={data[field.name] || ""}
                disabled={field.disabled}
                isInvalid={!!errors[field.name]}
                onChange={(e) => {
                  onChange(e);               // ✅ update form data
                  field.onChange?.(e);       // ✅ trigger hook logic
                }}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            ) : (
              <Form.Control
                type={field.type}
                name={field.name}
                value={data[field.name] || ""}
                disabled={field.disabled}
                isInvalid={!!errors[field.name]}
                onChange={(e) => {
                  onChange(e);
                  field.onChange?.(e);
                }}
              />
            )}

            <Form.Control.Feedback type="invalid">
              {errors[field.name]}
            </Form.Control.Feedback>
          </Form.Group>
        ))}
      </Card.Body>
    </Card>
  );
};

export default FormCard;
