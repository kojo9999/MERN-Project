import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect } from 'react';
import axios from "axios";


const Navbar =()=> {
  
  useEffect(() => {
  
    const token = JSON.parse(localStorage.getItem('refreshToken'));
    const config ={
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.post('http://localhost:4000/api/auth/token', {},config)
    .then(response => localStorage.setItem('accessToken',JSON.stringify(response.data.accessToken)))
    .catch(error => {
      console.error(error);
      // handle error
    });
  });


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