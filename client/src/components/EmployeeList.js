import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar.js';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('firstName');
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem('accessToken'));
  const config ={
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    axios.get('http://localhost:4000/api/employee/getAllEmployees', config)
      .then(response => setEmployees(response.data.Employees))
      .catch(error => {
        console.error(error);
        // handle error
      });
  }, []);

  const handleDelete = (event) => {
    const employeeId = event.target.value;
    event.preventDefault();
    axios.delete(`http://localhost:4000/api/employee/removeEmployeeById/${employeeId}`)
      .then(navigate(0))
      .catch(error => {
        console.error(error);
      });
  }

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

  let currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Sorting
  currentEmployees.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortColumn].localeCompare(b[sortColumn]);
    } else {
      return b[sortColumn].localeCompare(a[sortColumn]);
    }
  });

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(employees.length / employeesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  }

  return (
    <div>
      <Navbar/>
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
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
