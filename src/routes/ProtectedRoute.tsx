import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../utils/api";

interface ProtectedProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedProps> = ({ children }) => {
  const [isTokenValidated, setIsTokenValidated] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  //Verifica a validade do token
  useEffect(() => {
    const verifyToken = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setIsTokenValidated(true);
        return;
      }

      try {
        const response = await fetch(`${api}/auth/token`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          sessionStorage.setItem("name", data.name);
        } else {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("name");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Erro ao verificar token:", error);
        setIsAuthenticated(false);
      } finally {
        setIsTokenValidated(true);
      }
    };

    verifyToken();
  }, []);

  //Aguarda a validação do token antes de redirecionar
  if (!isTokenValidated) {
    return <div></div>;
  }

  //Redireciona com base na autenticação
  if (!isAuthenticated) {
    return <Navigate to="/not-found" />;
  }

  return children;
};
