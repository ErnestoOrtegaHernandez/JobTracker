import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
       <p id = "initial">HELLLOOOO</p>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'));