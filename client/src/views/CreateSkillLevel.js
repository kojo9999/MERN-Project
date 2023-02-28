import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom'

function CreateSkill() {
  const [skillName, setSkillName] = useState('');
  const [skillDesc, setSkillDesc] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    // Submit form data to the API
    const formData = {
      skillName,
      skillDesc,
    };

    console.log(formData);

    axios.post('/api/skillLevel/createNewSkillLevel', formData)
    .then((response) => {
      console.log(response.data);
    });
    navigate('/skillList')
  };

  return (
    <div>
      <Navbar/>
    <div className="edit-employee-container">
      <form className="edit-employee-form" onSubmit={handleSubmit}>
        <h2>Create New Skill</h2>
        <label>
          Skill Name:
          <input type="text" name="skillName" value={skillName} onChange={(e) => setSkillName(e.target.value)} />
        </label>
        <label>
          Skill Description:
          <input type="text" name="skillDesc" value={skillDesc} onChange={(e) => setSkillDesc(e.target.value)} />
        </label>
        <button className="submit-button" type="submit">Create</button>
      </form>
    </div>
    </div>
  );
}

export default CreateSkill;
