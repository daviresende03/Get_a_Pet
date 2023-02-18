import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// pages
import Home from './components/pages/Home';
import { Login, Register } from './components/pages/Auth/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
  </Router>
  );
}

export default App;
