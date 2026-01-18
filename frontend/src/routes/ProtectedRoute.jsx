import { Navigate } from "react-router-dom";
import { getAuth } from "../utils/authStorage";

const ProtectedRoute = ({ children }) => {
  const auth = getAuth();

  if (!auth || !auth.token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
