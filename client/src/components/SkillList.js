import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar.js';

function SkillList() {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:4000/api/skillLevel/getAllSkillLevels')
      .then(response => setSkills(response.data.SkillLevels))
      .catch(error => {
        console.error(error);
        // handle error
      });

      
  }, []);

  const handleDelete = (event) => {
    const skillId = event.target.value;
    console.log(skillId)
    event.preventDefault();
  axios.delete(`http://localhost:4000/api/skillLevel/deleteSkillLevelById/${skillId}`)
  .then(navigate(0))
  .catch(error => {
    console.error(error);
    
  });
  }

  


  return (
    <div>
      <Navbar/>
      <h1>Skill List</h1>
      <table>
        <thead>
          <tr>
            <th>Skill ID</th>
            <th>Skill Name</th>
            <th>Skill Description</th>
            <th>Edit</th>
            <th>Delete</th>
          
          </tr>
        </thead>
        <tbody>
          {skills.map(skill => (
            <tr key={skill.skillLevelId}>
              <td>{skill.skillLevelId}</td>
              <td>{skill.skillName}</td>
              <td>{skill.skillDesc}</td>
              <td><Link style={{ textDecoration: 'none',color:'black' }} to={`/editSkillLevel/${skill.skillLevelId}`}><button>Edit</button></Link></td>
              <td><button onClick={handleDelete}value={skill.skillLevelId}>Delete</button></td>
              
              
             
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default SkillList;
