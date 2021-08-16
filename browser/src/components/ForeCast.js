import moment from 'moment';
import { useState } from 'react';
import HourlyForeCast from './HourlyForeCast';


export default function ForeCast({ forecast, hourlyForecast }) {

    const [showHourlyForeCast, setShowHourlyForeCast] = useState(false);
    const [selectedDate, setSelectedDate] = useState(false);
    const [dayHourlyForeCast, setDayHourlyForeCast] = useState([]);
    function displayHourlyForecast(data, index) {
        setShowHourlyForeCast(false);
        setSelectedDate(true);
        let filteredForeCast = "";
        if (index < 2) {
            let selectedDate = moment.unix(data.dt).format('YYYY-MM-DD');
            setShowHourlyForeCast(true);
            filteredForeCast = hourlyForecast.filter((item) => {
                return (moment(moment.unix(item.dt).format('YYYY-MM-DD')).diff(selectedDate, 'days') === 0)
            });

            setDayHourlyForeCast(filteredForeCast)
        }
    }

    return (
        <>
            <h3>Forcast for next one week</h3>
            <div class="ui eight cards">
                {forecast.map((data, index) => {
                    return (
                        <div className="ui orange card">
                            <div className="content" onClick={() => displayHourlyForecast(data, index)} key={index}>
                                <div>Date : {moment.unix(data.dt).format('LL')}</div>
                                <div>Temperature : {Math.round((data.temp.max + data.temp.min) / 2)} °C</div>
                                <div>Humidity : {data.humidity} %</div>
                                <div>Desc : {data.weather[0].description} </div>
                            </div>
                        </div>
                    )
                })}
                <div>
                    {selectedDate && (showHourlyForeCast ? <HourlyForeCast hourlyForecast={dayHourlyForeCast} /> : <div class="ui message"><p>No hourly forecast available for this day.</p></div>)}
                </div>
            </div>
        </>    
    )
}
