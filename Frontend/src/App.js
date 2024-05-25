import './App.css';
import './css/login-page.css';
import './css/network.css';
import './css/home.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import Layout from './components/Layout';
import PersistLogin from './components/PersistLogin';
import Missing from './components/Missing';
import Profile from './components/Profile';
import FlightModal from './components/modals/FlightModal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="login" element={<Login />} />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="/flight" element={<FlightModal />} />
            </Route>
				    {/* <Route path='/dashboard' element={<Dashboard />} /> */}
			    </Route>
        </Route>
        <Route path="*" element={<Missing />} />
      </Routes>
    </Router>
  );
}

export default App;
