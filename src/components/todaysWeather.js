import React, {useEffect, useState} from "react";
import { Grid, Button, Typography, Icon } from "@material-ui/core";
import "../App.css";

const todaysWeather = () => {

    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);

    useEffect=(() => {
        
    })

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
            <Icon></Icon>
            <Typography variant='h3' style={{ padding: 10 }}>
                Weather Data here
            </Typography>
            </Grid>
        </Grid>
    );
};

export default todaysWeather;