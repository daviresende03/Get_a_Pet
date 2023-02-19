import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'

// components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Message from './components/layout/Message';

// pages
import Home from './components/pages/Home';
import Container from './components/layout/Container';
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'

// context
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar/>
        <Message />
        <Container>
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register/>} />
            <Route path="/" exact element={<Home />} />
            {/*<Route path="/teste" exact element={<Navigate to="/testando"/>} />*/}
          </Routes>
        </Container>
        <Footer/>
      </UserProvider>
  </Router>
  );
}

export default App;
