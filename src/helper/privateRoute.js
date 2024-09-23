import { Navigate } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const isLogged = localStorage.getItem("user_id");
  return isLogged ? <Component {...rest} /> : <Navigate to="/login" />;
}
