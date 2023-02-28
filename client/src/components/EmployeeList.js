import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css"

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/employee/getAllEmployees')
      .then(response => setEmployees(response.data.Employees))
      .catch(error => {
        console.error(error);
        // handle error
      });
  }, []);


  return (
    <div>
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Active Status</th>
            <th>Skill Level</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
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
              <td><a href={`/editEmployee/${employee.employeeId}`}>Edit</a></td>
              <td><a >Delete</a></td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default EmployeeList;
