import { useState, useMemo } from "react";
import { Container, Button } from "react-bootstrap";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormCard from "../../components/RegisterComponents/FormCard";
import { useRegisterFormConfig } from "../../app/config/registerFormConfig";
import { buildRegisterSchema } from "../../app/schema/buildRegisterSchema";

const Register = () => {
  const config = useRegisterFormConfig();
  const [step, setStep] = useState(0);
  const currentStep = config[step];

  const schema = useMemo(() => buildRegisterSchema(config), [config]);

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: config.reduce((acc, step) => {
      step.fields?.forEach(f => acc[f.name] = "");
      return acc;
    }, {}),
  });

  const next = async () => {
    const valid = await methods.trigger(currentStep.fields.map(f => f.name));
    if (valid) setStep(s => s + 1);
  };

  const back = () => setStep(s => s - 1);

  const onSubmit = (data) => {
    console.log("Final Data:", data);
    alert("Registration Successful 🎉");
  };

  if (!currentStep) return <div>Loading...</div>;

  return (
    <Container className="mt-5" style={{ maxWidth: 900 }}>
      <FormProvider {...methods}>
        {step < config.length - 1 ? (
          <>
            <FormCard title={currentStep.title} fields={currentStep.fields} />
            <div className="d-flex justify-content-between mt-4">
              {step > 0 && <Button onClick={back}>Back</Button>}
              <Button onClick={next}>Next</Button>
            </div>
          </>
        ) : (
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormCard title={currentStep.title} fields={currentStep.fields} />
            <div className="d-flex justify-content-between mt-4">
              {step > 0 && <Button onClick={back}>Back</Button>}
              <Button type="submit" variant="success">Submit</Button>
            </div>
          </form>
        )}
      </FormProvider>
    </Container>
  );
};

export default Register;
