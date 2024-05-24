import './App.css';
import './css/login-page.css';
// import './css/network.css';
// import './css/flight.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
      	<Route path='/login' element={<Login />} />
      	<Route path='/dashboard' element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
