import logo from './logo.svg';
import './App.css';
import Module from './Module';
import Home from './Home';
import { Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/admin/:type/module/:id" component={Module} />

        <Route path="/admin" component={Home} />
      </Switch>

    </div>
  );
}

export default App;
