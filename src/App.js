import { React, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Grid, Button, Typography } from "@material-ui/core";
import TodaysWeather from './components/todaysWeather.js';
import '@fontsource/roboto';

export default class App extends Component {
  state = {

  }

  

  render() {
    return (
      <div className='App'>
        <Grid container direction='row' justify='center' alignItems='center' style={{minHeight: '100%'}}>
          <Grid item style={{ backgroundColor: "greenyellow", flexGrow: 1}}>
            Hello
          </Grid>
          <Grid item style={{ backgroundColor: "blueviolet", flexGrow: 1 }}>
            World
          </Grid>
          <TodaysWeather/>
        </Grid>
      </div>
    );
  }
}
