import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { paths } from "../../Utils/constants";
import Navbar from "../Navbar/navbar";
import Login from "../Login/login";
import ProtectedRoute from "../../Utils/ProtectedRoute";
import Home from "../Home/home";
import BenchPress from "../Benchpress/benshpress";
import DumbbellPress from "../Dunbellpress/dunbellpress";
import ShoulderPress from "../Shoulderpress/sholderpress";


interface MainLayoutProps {
  isVerified: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ isVerified }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === paths.login;

  return (
    <>
      {!isLoginPage && <Navbar />} {/* Only render Navbar if it's not the login page */}
      <Routes>
        <Route path={paths.login} element={<Login />} />
        <Route element={<ProtectedRoute isVerified={isVerified} />}>
          <Route path={paths.home} element={<Home />} />
          <Route path={paths.benchPress} element={<BenchPress />} />
          <Route path={paths.dumbbellPress} element={<DumbbellPress />} />
          <Route path={paths.shoulderPress} element={<ShoulderPress />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainLayout;
