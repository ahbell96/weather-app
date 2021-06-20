import { React, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Grid, Button, Typography } from "@material-ui/core";
import TodaysWeather from './components/TodaysWeather.js';
import '@fontsource/roboto';

export default class App extends Component {
  state = {
    lat : [],
    long : []
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.state.lat = position.coords.latitude;
      this.state.long = position.coords.longitude;
  })
  console.log(this.state.lat);
  console.log(this.state.long);
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
