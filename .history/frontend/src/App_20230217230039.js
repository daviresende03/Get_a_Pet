import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages
import Home from './components/pages/Home';
import { Login, Register } from './components/pages/Auth/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<Home />}>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Routes>
  </Router>
  );
}

export default App;
