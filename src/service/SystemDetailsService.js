import { api } from "../utils/(common)/HttpApi";
import { useAsyncHandler } from "../hooks/shared/useAsyncHandler";
import { useNavigate } from "react-router-dom";

export default function SystemService() {
  const navigate = useNavigate();
  const { run, loading, error, setError } = useAsyncHandler();
  

  const getAllNavigation = () => {
    return run(async () => {
      
      const navigation = await api.get("/navItems");
      if(!navigation){ navigate("/"); }
      
      //if (!navigation.success) throw new Error("Invalid email or password");
      return navigation;
    });
  }

  return { getAllNavigation, loading, error };
}
