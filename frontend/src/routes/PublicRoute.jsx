import { Navigate } from "react-router-dom";
import { getAuth } from "../utils/authStorage";

const PublicAuthRoute = ({ children }) => {
  const auth = getAuth();

  if (auth && auth.token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicAuthRoute;
