import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: JSX.Element;
}

export const PublicRoute: React.FC<ProtectedProps> = ({ children }) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    return <Navigate to={"/home"} />;
  }

  return children;
};
