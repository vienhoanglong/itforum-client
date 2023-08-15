import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import decodeToken from "./utils/decodeToken";

interface PrivateRouteProps {
  children?: React.ReactNode;
  authenticated: boolean;
}

export const PrivateRouter: React.FC<PrivateRouteProps> = ({
  authenticated,
}) => {
  try {
    const accessToken: string = localStorage.getItem("accessToken") ?? "";
    if (accessToken && authenticated) {
      const decodedToken = decodeToken(accessToken);
      //check expiration access token
      const currentTimeStamp = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && decodedToken.exp >= currentTimeStamp) {
        return <Outlet />;
      }
      return <Navigate to="/sign-in" />;
    } else {
      return !authenticated ? <Outlet /> : <Navigate to={"/sign-in"} />;
    }
  } catch (err) {
    return <Navigate to="/sign-in" />;
  }
};

export default PrivateRouter;
