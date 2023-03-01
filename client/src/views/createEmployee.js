import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import "../App.css";
import Navbar from "../components/Navbar";

const token = JSON.parse(localStorage.getItem('accessToken'));
const config ={
  headers: { Authorization: `Bearer ${token}` }
};


function CreateEmployee() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch skills from the API and update state
    axios.get("/api/skillLevel/getAllSkillLevels",config).then((response) => {
      setSkills(response.data.skillLevels);
    });
  }, []);

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

    axios.post(`/api/employee/createEmployee`, formData)
    .then((response) => {
      console.log(response.data);
    });

    
  };

  return (
    <div>
      <Navbar></Navbar>
    <div className="edit-employee-container">
      <form className="edit-employee-form" onSubmit={handleSubmit}>
        <h2>Create New Employee</h2>
        <label>
          First Name:
          <input type="text" name="firstName" />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
          />
        </label>
        <label>
          Email:
          <input type="text" name="email" />
        </label>
        <label>
          Active:
          <input type="checkbox" name="active" defaultChecked={true} />
        </label>
        <label>
          Age:
          <input type="number" name="age" />
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
        <button className="submit-button" type="submit">Create</button>
      </form>
    </div>
    </div>
  );
}

export default CreateEmployee;
