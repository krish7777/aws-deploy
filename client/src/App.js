import logo from './logo.svg';
import './App.css';
import axios from "axios"
import React from "react"

class App extends React.Component {

  state = {
    name: "not there yet"
  };

  componentDidMount() {
    axios.get('api/course/test').then(r => {
      this.setState({
        name: r.data.test
      })
    })
  }

  render() {
    return (
      <div className="App">
        REACT APP , {this.state.name} some chande [Frontend v3]
      </div>
    );
  }

}

export default App;
