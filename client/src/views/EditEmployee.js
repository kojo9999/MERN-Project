import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import "../App.css";

function EditEmployee() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch employee data from the API and update state
    axios.get(`/api/employee/getEmployeeById/${employeeId}`).then((response) => {
      setEmployee(response.data.returnedEmployees);
    });

    // Fetch skills from the API and update state
    axios.get("/api/skillLevel/getAllSkillLevels").then((response) => {
      setSkills(response.data.SkillLevels);
    });
  }, [employeeId]);

  const handleSkillChange = (event) => {
    const skill = event.target.value
    setSelectedSkill(skill);
    console.log(selectedSkill);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Submit form data to the API
    const formData = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      dateOfBirth: event.target.dateOfBirth.value,
      email: event.target.email.value,
      active: event.target.active.checked,
      age: event.target.age.value,
      skills: [selectedSkill],
    };

    console.log(formData);

    axios.patch(`/api/employee/updateEmployeeById/${employeeId}`, formData)
    .then((response) => {
      console.log(response.data);
    });

    navigate('/')
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-employee-container">
      <form className="edit-employee-form" onSubmit={handleSubmit}>
        <h2>Edit Employee</h2>
        <label>
          First Name:
          <input type="text" name="firstName" defaultValue={employee.firstName} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" defaultValue={employee.lastName} />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            defaultValue={employee.dateOfBirth}
          />
        </label>
        <label>
          Email:
          <input type="text" name="email" defaultValue={employee.email} />
        </label>
        <label>
          Active:
          <input type="checkbox" name="active" defaultChecked={employee.active} />
        </label>
        <label>
          Age:
          <input type="number" name="age" defaultValue={employee.age} />
        </label>
        <label>
          Select a skill:
          <select className="skill-select" value={selectedSkill} onChange={handleSkillChange}>
            <option value="">Select a skill</option>
            {skills.map((skill) => (
              <option name="skillLevel" key={skill.skillLevelId} value={skill._id}>
                {skill.skillName}
              </option>
            ))}
          </select>
        </label>
        <button className="submit-button" type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditEmployee;