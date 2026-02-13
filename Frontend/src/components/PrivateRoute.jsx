import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/iniciar" />;
  if (roles && !roles.includes(user.rol)) return <Navigate to="/" />;

  return children;
};
