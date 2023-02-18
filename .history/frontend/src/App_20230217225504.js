import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/pages/Home';
import { Login, Register } from './components/pages/Auth/Login'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Home/>
        </Route>
        <Route path="/register">
          
        </Route>
        <Route path="/">
          
        </Route>
      </Switch>
  </Router>
  );
}

export default App;
