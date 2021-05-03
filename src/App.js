import './App.less';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Admin from './pages/admin'
import Login from './pages/login'
function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Admin} />

        </Switch>
      </BrowserRouter>
  );
}

export default App;
