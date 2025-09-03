import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  const publicShoppingPaths = ["/shop/home", "/shop/listing", "/shop/search"];
  const protectedShoppingPaths = ["/shop/checkout", "/shop/account"];

  if (location.pathname === "/") {
    return <Navigate to="/shop/home" />;
  }

  if (!isAuthenticated && protectedShoppingPaths.includes(location.pathname)) {
    return <Navigate to="/auth/login" />;
  }

  if (!isAuthenticated && !publicShoppingPaths.includes(location.pathname) &&
      !(location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    return <Navigate to="/auth/login" />;
  }

  if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
    return <Navigate to="/unauth-page" />;
  }

  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
