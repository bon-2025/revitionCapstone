import { Card, Form } from "react-bootstrap";
import { useFormContext, Controller } from "react-hook-form";

const FormCard = ({ title, fields }) => {
  const { control, formState: { errors }, setValue } = useFormContext();

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3">{title}</Card.Title>

        {fields.map((field) => {
          const fieldError = errors[field.name]?.message || "";

          return (
            <Form.Group key={field.name} className="mb-3">
              <Form.Label>{field.label}</Form.Label>

              <Controller
                name={field.name}
                control={control}
                render={({ field: controllerField }) =>
                  field.type === "select" ? (
                    <Form.Select
                      {...controllerField}
                      disabled={field.disabled}
                      isInvalid={!!fieldError}
                      onChange={(e) => {
                        controllerField.onChange(e);       // RHF state
                        field.onChange?.(e);               // fetch dependent options

                        // Reset child fields
                        if (field.name === "region") {
                          setValue("province", "");
                          setValue("city", "");
                          setValue("barangay", "");
                        }
                        if (field.name === "province") {
                          setValue("city", "");
                          setValue("barangay", "");
                        }
                        if (field.name === "city") {
                          setValue("barangay", "");
                        }
                      }}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </Form.Select>
                  ) : (
                    <Form.Control
                      type={field.type}
                      {...controllerField}
                      isInvalid={!!fieldError}
                    />
                  )
                }
              />

              <Form.Control.Feedback type="invalid">
                {fieldError}
              </Form.Control.Feedback>
            </Form.Group>
          );
        })}
      </Card.Body>
    </Card>
  );
};

export default FormCard;
