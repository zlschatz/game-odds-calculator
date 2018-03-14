import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from './material-ui/styles/MuiThemeProvider';
import Calculator from'./calculator.js';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App spaceGradient">
          <div className="App-intro">
            <Calculator />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
