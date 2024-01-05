//import axios from 'axios';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import './App.css';
import Login from './Components/user_authentication/login';
import Registration from './Components/user_authentication/registration';
function App() {
  return (
    <Router>
    <div className="App">
      <header className='App-header'>
        <h1>E-Commerce Website</h1>
      </header>
      <Routes>
        <Route path="/users/register" element={<Registration/>}/>
        <Route path="/users/login" element={<Login/>}/>
      </Routes>
     </div>
     </Router>
  );
}

export default App;
