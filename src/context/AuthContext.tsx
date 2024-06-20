import { ReactNode, createContext, useContext } from "react";
import { api } from "../utils/api";

interface Types {
  login: (email: string, passrod: string) => Promise<Response>;
  logout: () => void;
}

const AuthContext = createContext<Types | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const login = async (email: string, password: string): Promise<Response> => {
    try {
      const response = await fetch(`${api}/auth/login-dash`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.body.token;
        sessionStorage.setItem("token", token);
      } else {
      }

      return response;
    } catch (e) {
      console.error("Erro: ", e);
      throw e;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
  };

  const value = {
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
