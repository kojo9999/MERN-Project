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
  const [errors, setErrors] = useState({});
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
  
    // Validate form data
    const formData = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      dateOfBirth: event.target.dateOfBirth.value,
      email: event.target.email.value,
      active: event.target.active.checked,
      skills: [selectedSkill],
    };
  
    const newErrors = {};
  
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }
  
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }
  
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
  
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
  
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    formData.age = age;
  
    if (!formData.skills[0]) {
      newErrors.skills = "Skill is required";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    console.log(formData);
  
    // Submit form data to the API
    axios.post(`/api/employee/createEmployee`,formData,config)
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
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
          />
          {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
        </label>
        <label>
          Email:
          <input type="text" name="email" />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>
          Active:
          <input type="checkbox" name="active" defaultChecked={true} />
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
