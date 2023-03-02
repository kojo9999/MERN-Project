import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function CreateSkill() {
  const [skillName, setSkillName] = useState('');
  const [skillDesc, setSkillDesc] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('accessToken'));
  const config ={
    headers: { Authorization: `Bearer ${token}` }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form data
    const validationErrors = [];
    if (skillName.trim() === '') {
      validationErrors.push('Please enter a skill name');
    }
    if (skillDesc.trim() === '') {
      validationErrors.push('Please enter a skill description');
    }
    setErrors(validationErrors);

    // If there are any validation errors, don't submit the form
    if (validationErrors.length > 0) {
      return;
    }

    // Submit form data to the API
    const formData = {
      skillName,
      skillDesc,
    };

    axios.post('/api/skillLevel/createNewSkillLevel', formData, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    navigate('/skillList');
  };

  return (
    <div>
      <Navbar />
      <div className="edit-employee-container">
        <form className="edit-employee-form" onSubmit={handleSubmit}>
          <h2>Create New Skill</h2>
          {errors.length > 0 && (
            <div className="error">
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
          <label>
            Skill Name:
            <input
              type="text"
              name="skillName"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
            />
          </label>
          <label>
            Skill Description:
            <input
              type="text"
              name="skillDesc"
              value={skillDesc}
              onChange={(e) => setSkillDesc(e.target.value)}
            />
          </label>
          <button className="submit-button" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateSkill;