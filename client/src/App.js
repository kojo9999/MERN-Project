import './App.css';
import EmployeeList from './components/EmployeeList';
import Dashboard from './views/Dashboard';
import { BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Register from './views/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<EmployeeList/>}></Route>
          <Route path='/register' element={<Register/>}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
