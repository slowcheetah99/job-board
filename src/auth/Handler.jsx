import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SignIn, SignUp } from "../pages";

export function IsUserRedirect({ user, setUser, data, setData }) {
  const { pathname } = useLocation();
  return user ? (
    <Navigate to="/" />
  ) : pathname === "/signin" ? (
    <SignIn user={user} setUser={setUser} />
  ) : (
    <SignUp user={user} setUser={setUser} data={data} setData={setData} />
  );
}

export function ProtectedRoute({ user }) {
  return user ? <Outlet /> : <Navigate to="/signin" />;
}
