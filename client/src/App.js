import './App.css';
import EmployeeList from './components/EmployeeList';
import Dashboard from './views/Dashboard';
import { BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Register from './views/Register';
import EditEmployee from './views/EditEmployee'
import CreateEmployee from './views/createEmployee';
import SkillList from './components/SkillList';
import CreateSkillLevel from './views/CreateSkillLevel';
import EditSkillLevel from './views/EditSkillLevel';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/employeeList' element={<EmployeeList/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/editEmployee/:employeeId' element={<EditEmployee/>}></Route>
          <Route path='/createEmployee' element={<CreateEmployee/>}></Route>
          <Route path='/skillList' element={<SkillList/>}></Route>
          <Route path='/createSkillLevel' element={<CreateSkillLevel/>}></Route>
          <Route path='/EditSkillLevel/:skillLevelId' element={<EditSkillLevel/>}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
