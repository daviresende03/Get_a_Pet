import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'

// pages
import Home from './components/pages/Home';
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register/>} />
        <Route path="/" exact element={<Home />} />
        <Route path="/teste" exact element={<Navigate to="/testando"/>} />
      </Routes>
  </Router>
  );
}

export default App;
