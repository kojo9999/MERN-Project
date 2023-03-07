import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar.js';

function EmployeeList() {
  // Declare state variables for employees, current page, employees per page, sort order, and sort column
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('firstName');
  // Declare navigate function from react-router-dom to allow redirection to another route
  const navigate = useNavigate()
  // Retrieve the access token from local storage
  const token = JSON.parse(localStorage.getItem('accessToken'));
  // Set the authorization header for axios requests
  const config ={
    headers: { Authorization: `Bearer ${token}` }
  };

  // Fetch employees data from API using axios and update the state variable
  useEffect(() => {
    axios.get('http://localhost:4000/api/employee/getAllEmployees', config)
      .then(response => setEmployees(response.data.Employees))
      .catch(error => {
        console.error(error);
        // handle error
      });
  }, []);

  // Handle the delete button click by sending a delete request to API and redirect to home page
  const handleDelete = (event) => {
    const employeeId = event.target.value;
    event.preventDefault();
    axios.delete(`http://localhost:4000/api/employee/removeEmployeeById/${employeeId}`,config,{})
      .then(navigate(0))
      .catch(error => {
        console.error(error);
      });
  }

  // Calculate the index of the last employee on the current page and the index of the first employee on the current page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

  // Slice the employees array to only include employees on the current page
  let currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Sorting
  // Sort the current employees array based on the sort order and sort column state variables
  currentEmployees.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortColumn].localeCompare(b[sortColumn]);
    } else {
      return b[sortColumn].localeCompare(a[sortColumn]);
    }
  });

  // Function to change the current page number
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Create an array of page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(employees.length / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  // Handle column sorting by updating the sort order and sort column state variables
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  }

  // Render the employee list table
  return (
    <div>
      {/* Render the navbar component */}
      <Navbar/>
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            {/* Add sorting capability by passing the column name to handleSort function */}
            <th onClick={() => handleSort('employeeId')}>Employee ID</th>
            <th onClick={() => handleSort('firstName')}>First Name</th>
            <th onClick={() => handleSort('lastName')}>Last Name</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('dateOfBirth')}>Date of Birth</th>
            <th>Active Status</th>
            <th>Skill Level</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map(employee => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.active ? 'Active' : 'Inactive'}</td>
              <td>
                {employee.skills.map(skill => (
                  <div key={skill.skillLevelId} >
                    <strong>{skill.skillName}: </strong>
                    <span>{skill.skillDesc}</span>
                  </div>
                ))}
              </td>
              <td><Link style={{ textDecoration: 'none',color:'black' }} to={`/editEmployee/${employee.employeeId}`}><button>Edit</button></Link></td>
              <td><button onClick={handleDelete} value={employee._id}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>{number}</button>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;
