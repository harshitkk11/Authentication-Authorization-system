import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isLogin = localStorage.getItem("islogin");
  if (!isLogin) return <Navigate to="/login" />;
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
