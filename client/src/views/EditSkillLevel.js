import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';

const token = JSON.parse(localStorage.getItem('accessToken'));
const config ={
  headers: { Authorization: `Bearer ${token}` }
};

function EditSkillLevel() {
  const [skillName, setSkillName] = useState('');
  const [skillDesc, setSkillDesc] = useState('');
  const navigate = useNavigate();
  const { skillLevelId } = useParams();
  const token = JSON.parse(localStorage.getItem('accessToken'));
  const config ={
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    // Fetch skill details from the API and update state
    axios
      .get(`/api/skillLevel/getSkillLevelById/${skillLevelId}`,config)
      .then((response) => {
        setSkillName(response.data.skillName);
        setSkillDesc(response.data.skillDesc);
      })
      .catch((error) => console.log(error));
  }, [skillLevelId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Submit form data to the API
    const formData = {
      skillName,
      skillDesc,
    };

    console.log(formData);

    axios
      .patch(`/api/skillLevel/updateSkillLevelById/${skillLevelId}`, formData,config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
    navigate('/skillList');
  };

  return (
    <div>
      <Navbar />
      <div className="edit-employee-container">
        <form className="edit-employee-form" onSubmit={handleSubmit}>
          <h2>Edit Skill</h2>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditSkillLevel;