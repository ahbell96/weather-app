import {React, Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Grid, Button, Typography} from '@material-ui/core';

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <Button variant="contained" color="primary">Hello World</Button>
      </div>
    );
  }
}
