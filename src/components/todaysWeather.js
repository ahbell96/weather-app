import React, {useEffect, useState} from 'react';
import { Grid, Button, Typography, Icon } from "@material-ui/core";
import "../App.css";
import axios from "axios";

const TodaysWeather = () => {

    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        })
    }, [])

    useEffect (() => {
        if(lat && long) {
            axios.get(`/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`).then(({data, config}) => {
                setWeatherData(data);
            })
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
            <Typography variant='h2'>Weather</Typography>
            <Grid item justify="center" alignContent="center" direction="row">
            <img src={`${process.env.REACT_APP_ICON_URL}/${weatherData ? weatherData.weather[0].icon : 'undefined'}@2x.png`}></img>
            <Typography variant='h3' style={{ padding: 10 }}>
                {weatherData ? weatherData.weather[0].main : ''}
            </Typography>
            </Grid>
        </Grid>
    );
};

export default TodaysWeather;
