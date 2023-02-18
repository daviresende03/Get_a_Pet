import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages
import Home from './components/pages/Home';
import { Login, Register } from './components/pages/Auth/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<Home />} />
        <Route path="/register" exact element={<Register/>} />
        <Route path="/" exact element={<Home />}>
          <Home/>
        </Route>
      </Routes>
  </Router>
  );
}

export default App;
