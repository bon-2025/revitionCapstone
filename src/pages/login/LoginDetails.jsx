import useLoginDetails from "../../hooks/Login/useLoginDetails";
import LoginContainer from "../../components/LoginComponents/LoginContainer";
import Logo from "../../components/LoginComponents/Logo";
import Title from "../../components/LoginComponents/Title";
import ErrorAlert from "../../components/shared/ErrorAlert";
import Form from "../../components/shared/Form";
import loginFields from "../../app/config/loginFieldsConfig";

export default function LoginDetails() {
  const { register, handleSubmit, errors, onSubmit, loading, error } = useLoginDetails();

  return (
    <LoginContainer>
      <Logo />
      <Title />

      {error && <ErrorAlert error={error} />}
      
      <Form
        fields={loginFields}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit(onSubmit)} // wrapped submit function
        loading={loading}
      />
    </LoginContainer>
  );
}
