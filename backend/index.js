const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const port = process.env.PORT || 3001;

const API_URL = `https://api.openweathermap.org/data/2.5`;
const API_KEY = `xxxxxxxx`;

app.use(cors())

app.get('/getWeatherInfoByLocation',(req,res) => {
    try{
        let location = req.query.location;
        let url = `${API_URL}/weather?q=${location}&appid=${API_KEY}`;
        request(url,(error, response, body) => {
            weatherDetails = JSON.parse(body);
            res.send(weatherDetails);
        });
    }
    catch(error){
        console.log(error);
        errorDetails = JSON.parse(error);
        res.send(error);
    }
});

app.get('/getWeatherInfoByGeo',(req,res) => {
    try{
        let latitude = req.query.lat;
        let longitude = req.query.long;
        let url = `${API_URL}/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts,minutely&appid=${API_KEY}`;
        request(url,(error, response,body) => {
            weatherDetails = JSON.parse(body);
            res.send(weatherDetails);
        });
    }
    catch(error){
        console.log(error);
        errorDetails = JSON.parse(error);
        res.send(error);
    }
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})