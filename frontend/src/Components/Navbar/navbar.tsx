import React from "react";
import { NavLink } from "react-router-dom";
import { paths } from "../../Utils/constants";
import "./style.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h2>FlexGym</h2>
      <div className="nav-buttons">
        <NavLink to={paths.home} className="nav-button">Home</NavLink>
        <NavLink to={paths.benchPress} className="nav-button">Bench Press</NavLink>
        <NavLink to={paths.dumbbellPress} className="nav-button">Dumbbell Press</NavLink>
        <NavLink to={paths.shoulderPress} className="nav-button">Shoulder Press</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
