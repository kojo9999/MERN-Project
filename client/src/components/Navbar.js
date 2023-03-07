import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect } from 'react';
import axios from "axios";



const token = JSON.parse(localStorage.getItem('refreshToken'));
    const config ={
      headers: { Authorization: `Bearer ${token}` }
    };

const Navbar =()=> {
  
  useEffect(() => {
    axios.post('http://localhost:4000/api/auth/token', {},config)
    .then(response => localStorage.setItem('accessToken',JSON.stringify(response.data.accessToken)))
    .catch(error => {
      console.error(error);
      // handle error
    });

  });

 
    
  const navigate = useNavigate();

  const handleOnClick=(event)=>{
    event.preventDefault();
   

    const data = {
      refreshToken:token
    }

    axios.delete('http://localhost:4000/api/auth/logout', data,{})
    .then(response => console.log(response.data),
    localStorage.removeItem('user'),
    localStorage.removeItem('accessToken'),
    localStorage.removeItem('refreshToken'))
    .catch(error => {
      console.error(error);
    });

    navigate('/register');
    

  }


  return (
<nav className="navbar">
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
      <li className="dropdown">
      <Link to="#">Employees</Link>
        <ul className="dropdown-menu">
          <li><Link to="/employeeList">Employee List</Link></li>
          <li><Link to="/createEmployee">Create Employee</Link></li>
        </ul>
    </li>
      <li className="dropdown">
        <Link to="#">Skills</Link>
        <ul className="dropdown-menu">
          <li><Link to="/skillList">Skill Levels</Link></li>
          <li><Link to="/createSkillLevel">Create Skill Level</Link></li>
        </ul>
    </li>
    <li>
      <Link to="/register" onClick={handleOnClick}>Log Out</Link>
    </li>
  </ul>
</nav>

  )
}

  

export default Navbar;