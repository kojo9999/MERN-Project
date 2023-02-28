import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar =()=> {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/employeeList">Employee List</Link>
        </li>
        <li>
          <Link to="/createEmployee">Create Employee</Link>
        </li>
        <li>
          <Link to="/skillList">Skill Levels</Link>
        </li>
        <li>
          <Link to="/createSkillLevel">Create Skill Level</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;