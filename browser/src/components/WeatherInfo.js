import moment from 'moment';

export default function WeatherInfo({temperature, humidity, city, searchLocation}){

    return (
        <div className="ui orange card">
            <div className="content">
                {/* {searchLocation && city && 
                    <div>Search Loaction: {searchLocation}</div>
                } */}
                <div >
                    <div>Current Location : {city}</div>
                </div>
                <div>
                    <div>Date : {moment().format('LLLL')}</div>
                    <div>Temperature : {Math.floor(temperature)} °C</div>
                    <div>Humidity : {humidity} %</div>
                </div>
            </div> 
        </div>     
    )
}
