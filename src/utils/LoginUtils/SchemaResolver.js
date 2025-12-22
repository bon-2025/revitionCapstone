import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../app/schema/LoginSchema";

const SchemaResolver = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // <-- validate on each change
  });

  return { register, handleSubmit, errors, setValue };
};

export default SchemaResolver;
