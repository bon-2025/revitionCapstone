import { createContext, useContext } from "react";
import useUserService from "../../service/UserService";
import useSystemService from "../../service/SystemDetailsService";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {

  const { user, login, logout, loading: userLoading, error: userError } = useUserService();
  const { systemLoading: systemLoading, error: systemError, getAllNavigation } = useSystemService();

  // Combine loading and error states
  const loading = userLoading || systemLoading;
  const error = userError || systemError;

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error, getAllNavigation }}>
      {children}
    </AuthContext.Provider>
  );
}
