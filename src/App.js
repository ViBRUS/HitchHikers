import './App.css';
import './css/login-page.css';
import './css/network.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
      	<Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
