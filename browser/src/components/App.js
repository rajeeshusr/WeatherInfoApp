import axios from "axios";
import './App.css';
import { useEffect, useState, useRef } from 'react';
import WeatherInfo from "./WeatherInfo";
import ForeCast from "./ForeCast";
import Header from "./Header";

function App() {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState('');
  const [locationName, setLocationName] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const inputEl = useRef("");

  useEffect(() => {
    if (locationName == null) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      })
    }
  });

  useEffect(() => {
    if (latitude && longitude) {
      setLoading(true);
      setError(null);
      axios.get(`http://localhost:3001/getWeatherInfoByGeo`, {
        params: {
          lat: latitude,
          long: longitude,
          cnt: 1
        }
      })
        .then((weatherInfo) => {
          setLoading(false);
          setCity(weatherInfo.data.timezone);
          setTemperature(weatherInfo.data.current.temp);
          setHumidity(weatherInfo.data.current.humidity);
          setForecast(weatherInfo.data.daily);
          setHourlyForecast(weatherInfo.data.hourly);
        })
        .catch((error) => {
          console.log('Error : ', error);
          if (error && error.message) {
            setError(error.message)
          }
        })
    }

  }, [latitude, longitude]);

  function handleSearch() {
    setLoading(true);
    setError(null);
    axios.get(`http://localhost:3001/getWeatherInfoByLocation`, {
      params: {
        location: locationName
      }
    })
      .then((weatherInfo) => {
        setLoading(false);
        if (weatherInfo.data.cod === 200) {
          setLocationName(weatherInfo.data.name);
          setLongitude(weatherInfo.data.coord.lon);
          setLatitude(weatherInfo.data.coord.lat);
        }
        else {
          setError(weatherInfo.data.message)
        }
      })
      .catch((error) => {
        console.log('Error : ', error);
        if (error && error.message) {
          setError(error.message)
        }
      })
  };

  return (

    <>
      <Header />
      <div className="ui container" >
        <div className="ui right aligned category search">
          <div className="ui left icon input" style={{ marginRight: "10px" }}>
            <input ref={inputEl} type="text" placeholder="Eg: London, UK" name="locationName" className="prompts" onChange={(event) => { setLocationName(event.target.value) }} />
            <i className="search icon"></i>
          </div>
          <button className="ui button blue" onClick={() => handleSearch()}>Search</button>
        </div>
        {error && <div className="ui message"><p>{error}</p></div>}
        {loading && (
          <div style={{ marginTop: "20px" }}>
            <div className="ui active inline loader"></div>
          </div>
        )}
        {!error && !loading && temperature &&
          <div className="ui celled list">
            <WeatherInfo temperature={temperature} humidity={humidity} city={city} searchLocation={locationName} />
            <ForeCast forecast={forecast} hourlyForecast={hourlyForecast} />
          </div>
        }
      </div>
    </>
  )
}

export default App;
