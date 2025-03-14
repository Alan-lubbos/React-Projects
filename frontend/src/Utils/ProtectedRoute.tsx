import React, { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../State/store"; // Ensure correct path
import { paths } from "../Utils/constants"; // Ensure correct path

interface IProtectedRouteProps {
  isVerified: boolean;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ isVerified }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const googleAccessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userAccessToken = useSelector((state: RootState) => state.userAuth.accessToken);

  // Prevent useEffect from running infinitely
  const hasRunEffect = useRef(false);

  useEffect(() => {
    if (hasRunEffect.current) return;
    hasRunEffect.current = true;

    // If the user is logged in (either via Google or local login) and on the login page, navigate to home
    if ((googleAccessToken || userAccessToken) && location.pathname === paths.login) {
      navigate(paths.home, { replace: true });
    }
  }, [googleAccessToken, userAccessToken, navigate, location.pathname]);

  // Redirect to login if no valid token found
  if (!(googleAccessToken || userAccessToken)) {
    return <Navigate to={paths.login} replace />;
  }

  return <Outlet />; // Allow access to protected routes
};

export default ProtectedRoute;
