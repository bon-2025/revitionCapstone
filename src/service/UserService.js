import { api } from "../utils/(common)/HttpApi";
import { useAsyncHandler } from "../hooks/shared/useAsyncHandler";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserService() {
  const navigate = useNavigate();
  const { run, loading, error, setError } = useAsyncHandler();
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email, password) => {
    return run(async () => {
      const users = await api.get("/users", { params: { email, password } }, 3000);

      if (!users || users.length === 0) throw new Error("Invalid email or password");

      const loggedUser = users[0];
      setUser(loggedUser);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      console.log("Logged in user:", loggedUser);

      navigate("/dashboard");
      return loggedUser;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setError("");
    navigate("/", { replace: true });
  };

  return { user, login, logout, loading, error };
}
