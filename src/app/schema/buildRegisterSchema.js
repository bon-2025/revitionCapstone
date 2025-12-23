import { z } from "zod";

export const buildRegisterSchema = (config = []) => {
  const shape = {};
  const matchRules = [];

  config.forEach((step) => {
    step.fields?.forEach((field) => {
      let schema = z.string();
      if (field.required) schema = schema.min(1, `${field.label} is required`);
      else schema = schema.optional();

      if (field.type === "email") schema = schema.email("Invalid email address");
      if (field.minLength) schema = schema.min(field.minLength, `Minimum ${field.minLength} characters`);
      if (field.type === "select" && field.options?.length) {
        schema = z.enum(field.options.map((o) => o.value));
        if (!field.required) schema = schema.optional();
      }

      shape[field.name] = schema;

      if (field.match) matchRules.push({ field: field.name, match: field.match });
    });
  });

  let finalSchema = z.object(shape);

  matchRules.forEach(({ field, match }) => {
    finalSchema = finalSchema.refine((data) => data[field] === data[match], {
      path: [field],
      message: `${field} must match ${match}`,
    });
  });

  return finalSchema;
};
