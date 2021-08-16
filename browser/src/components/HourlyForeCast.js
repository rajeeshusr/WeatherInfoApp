import moment from 'moment';

export default function HourlyForeCast({hourlyForecast}){

    return (
        <>
            <h3>Hourly Forcast for {moment.unix(hourlyForecast[0].dt).format('LL')}</h3>
            <div class="ui four cards">
                {hourlyForecast.map((data,index) => {
                    return (
                        <div className="ui orange card">
                            <div className="content" key={index}>
                                <div>Date : {moment.unix(data.dt).format('LLLL')}</div>
                                <div>Temperature : {Math.floor(data.temp)} °C</div>
                                <div>Humidity : {data.humidity} %</div>
                                <div>Description : {data.weather[0].description} </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
