import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Icon } from "@material-ui/core";
import "../App.css";
import axios from "axios";

const TodaysWeather = () => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [celsiusTemp, setCelsiusTemp] = useState(null);
  const [celsiusTemps, setCelsiusTemps] = useState([
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    if (lat && long) {
      axios
        .get(
          `/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then(({ data, config }) => {
          setWeatherData(data);
        });
    }
  }, [lat, long]);

  useEffect(() => {
    if (weatherData) {
      kelvinToCelsius(weatherData.main.temp, "current temperature");
      kelvinToCelsius(weatherData.main.temp_max, "max temperature");
      kelvinToCelsius(weatherData.main.temp_min, "min temperature");
    }
  }, [weatherData]);

  const kelvinToCelsius = (kelvinTemp, kelvinName) => {
    let tempTemps = celsiusTemps;
    let kelvinToCelsiusTemp = kelvinTemp - 273.15;
    kelvinToCelsiusTemp = Math.round(kelvinToCelsiusTemp * 100) / 100;
    const newTemperature = kelvinToCelsiusTemp.toString() + "°c";

    // then put into state
  };

  return (
    <Grid
      container
      direction='column'
      alignContent='center'
      justify='center'
      style={{ height: "90vh" }}
    >
      <Typography variant='h1' style={{ padding: 20 }}>
        {weatherData ? weatherData.name : ""}
      </Typography>
      <Grid item>
        <Typography variant='h3' style={{ padding: 10 }}>
          {weatherData ? weatherData.weather[0].main : ""}
        </Typography>
      </Grid>
      <Grid
        item
        justify='center'
        alignContent='center'
        direction='row'
        style={{ width: "100%", display: "flex" }}
      >
        <img
          src={`${process.env.REACT_APP_ICON_URL}/${
            weatherData ? weatherData.weather[0].icon : "undefined"
          }@2x.png`}
        ></img>
        <Typography variant='h2'>
          current temperature
        </Typography>
      </Grid>
      <Grid item justify='center' alignContent='center' direction='row'>
        <Typography variant='h2'>
          max temperature
        </Typography>
        <Typography variant='h2'>
          min temperature
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TodaysWeather;
