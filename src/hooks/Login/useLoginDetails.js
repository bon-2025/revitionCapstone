import { useAuth } from "../../app/context/UserAuthContext";
import SchemaResolver from "../../utils/LoginUtils/SchemaResolver";

export default function useLoginDetails() {
  const { login, loading, error } = useAuth();
  const { register, handleSubmit, errors } = SchemaResolver();

  const onSubmit = async (data) => {
    await login(data.email, data.password);
  };

  return { register, handleSubmit, errors, onSubmit, loading, error };
}
