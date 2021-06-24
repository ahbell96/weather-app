import { React, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Grid, Button, Typography } from "@material-ui/core";
import TodaysWeather from './components/TodaysWeather.js';
import '@fontsource/roboto';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
console.log(process.env);

export default class App extends Component {
  state = {
    lat : null,
    long : null
  }

  componentDidMount() {
    const self = this;
    navigator.geolocation.getCurrentPosition((position) => {
      self.setState({lat : position.coords.latitude, long : position.coords.longitude});
  })
  }

  render() {
    return (
      <div className='App'>
        <Grid container direction='row' justify='center' alignItems='center' style={{minHeight: '100%'}}>
          <TodaysWeather/>
        </Grid>
      </div>
    );
  }
}
