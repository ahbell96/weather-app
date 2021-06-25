import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Icon, TextField } from "@material-ui/core";
import "../App.css";
import axios from "axios";

const TodaysWeather = () => {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [celsiusTemps, setCelsiusTemps] = useState([]);
  const [convertedTempsWithLabels, setConvertedTempsWithLabels] = useState([]);

  let [searchForm, setSearchForm] = useState({
      query : "",
  })

  const setFieldValueInForm = (event) => {
    let updatedSearchForm = {...searchForm};
    updatedSearchForm[event.target.name] = event.target.value;
    setSearchForm(updatedSearchForm);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  const createTemperature = (kelvinTemp, tempName, iconId) => {
    let tempTemps = celsiusTemps;
    let kelvinToCelsiusTemp = kelvinTemp - 273.15;
    kelvinToCelsiusTemp = Math.round(kelvinToCelsiusTemp * 100) / 100;
    const newTemperature = kelvinToCelsiusTemp.toString() + "°c";
    return { temp: newTemperature, name: tempName, icon: iconId };
    // then put into state array and replace needed value
  };

    // HW
        // create axios request based on entered textfield location
        

  useEffect(() => {
    if (lat && long) {
      axios
        .get(
          `/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then(({ data, config }) => {
          const availableTempratures = [];

          availableTempratures.push(
            createTemperature(data.main.temp, "", data.weather[0].icon)
          );
          availableTempratures.push(
            createTemperature(data.main.temp_max, "high")
          );
          availableTempratures.push(
            createTemperature(data.main.temp_min, "low")
          );

          setConvertedTempsWithLabels(availableTempratures);
          setWeatherData(data);
        });
    }
  }, [lat, long]);

  return (
    <Grid
      container
      direction='column'
      alignContent='center'
      justify='center'
      style={{ height: "90vh" }}
    >
    <Grid item>
    
        <TextField label="Location" name={"query"} onChange={setFieldValueInForm} value={searchForm['query']}></TextField>
        <Button>Go</Button>

    </Grid>
      <Typography variant='h1' style={{ padding: 20 }}>
        {weatherData ? weatherData.name : ""}
      </Typography>
      <Grid item>
        <Typography variant='h3' style={{ padding: 10 }}>
          {weatherData ? weatherData.weather[0].main : ""}
        </Typography>
      </Grid>
      {convertedTempsWithLabels.map((i, index) => (
        <Grid
          item
          justify='center'
          alignContent='center'
          direction='row'
          style={{ width: "100%", display: "flex" }}
        >
          { i.icon ? <img
            src={`${process.env.REACT_APP_ICON_URL}/${
                i.icon
            }@2x.png`}
          ></img> : ""}
          <Typography variant='h2'>
            {i.temp} {i.name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default TodaysWeather;
