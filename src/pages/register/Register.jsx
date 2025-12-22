import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import FormCard from "../../components/RegisterComponents/FormCard";
import { useRegisterFormConfig } from "../../app/config/registerFormConfig";

const Register = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const registerFormConfig = useRegisterFormConfig();

  const currentStep = registerFormConfig.find(
    (cfg) => cfg.step === step
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const e = {};

    currentStep.fields.forEach((field) => {
      const value = data[field.name];

      if (field.required && !value) {
        e[field.name] = "Required";
      }

      if (field.minLength && value?.length < field.minLength) {
        e[field.name] = `Minimum ${field.minLength} characters`;
      }

      if (field.match && value !== data[field.match]) {
        e[field.name] = "Does not match";
      }
    });

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    setErrors({});
    setStep((s) => s + 1);
  };

  const back = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Final Data:", data);
    alert("Registration Successful 🎉");
  };

  return (
    <Container className="mt-5" style={{ maxWidth: 600 }}>
      {step < registerFormConfig.length - 1 ? (
        <>
          <FormCard
            title={currentStep.title}
            fields={currentStep.fields}
            data={data}
            errors={errors}
            onChange={handleChange}
          />

          <div className="d-flex justify-content-between mt-4">
            {step > 0 && (
              <Button variant="secondary" onClick={back}>
                Back
              </Button>
            )}
            <Button onClick={next}>Next</Button>
          </div>
        </>
      ) : (
        <form onSubmit={submit}>
          <FormCard
            title={currentStep.title}
            fields={currentStep.fields}
            data={data}
            errors={errors}
            onChange={handleChange}
          />

          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={back}>
              Back
            </Button>
            <Button type="submit" variant="success">
              Submit
            </Button>
          </div>
        </form>
      )}
    </Container>
  );
};

export default Register;
