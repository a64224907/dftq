import './App.less';
import {BrowserRouter,Switch} from 'react-router-dom'
import Admin from './pages/admin'
import Login from './pages/login'
function App() {
  return (
      <BrowserRouter>
        <Switch>
        <Login path="/login" />
          <Admin path="/" />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
