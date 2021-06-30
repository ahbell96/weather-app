import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, Icon, TextField } from "@material-ui/core";
import axios from "axios";

const WeatherSearch = ({ updateWeatherWithData }) => {
  let [searchForm, setSearchForm] = useState({
    query: "",
  });

  const getWeatherByLocation = (query) => {
    axios
      .get(`/weather?q=${query}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(updateWeatherWithData);
  };

  const setFieldValueInForm = (event) => {
    let updatedSearchForm = { ...searchForm };
    updatedSearchForm[event.target.name] = event.target.value;
    setSearchForm(updatedSearchForm);
  };

  return (
    <Grid item>
      <TextField
        label='Location'
        name={"query"}
        onChange={setFieldValueInForm}
        onKeyDown={(e) => e.key == 'Enter' ? getWeatherByLocation(searchForm["query"]) : () => {}}
        value={searchForm["query"]}
      ></TextField>
      <Button onClick={() => getWeatherByLocation(searchForm["query"])}>
        Go
      </Button>
    </Grid>
  );
};

export default WeatherSearch;
