import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from './components/Button';
import ClothesBlock from "./components/ClothesBlock";
import { OPENWEATHERMAP_ICON_URL_PREFIX }  from './components/constants';
import './styles/weather.css';
import RefreshButton from "./components/RefreshButton";

const Weather = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { weatherData, city } = location.state || {};
    const [inCelsius, setInCelsius] = useState(false);
    const [suggestionTrigger, setSuggestionTrigger] = useState(false);

    const weatherCondition = weatherData?.weather[0].main;
    const weatherIcon = weatherData?.weather[0].icon;
    const temperature = weatherData.main.temp;
    const feelsLikeTemperature = weatherData.main.feels_like;
    const lowTemperature = weatherData.main.temp_min;
    const highTemperature = weatherData.main.temp_max;
    const wind = weatherData.wind.speed;

    const goBack = () => {
        navigate('/');
    }

    const toFarenheit = (temperature : number) => {
        return Math.round(((temperature * 9) / 5 + 32));
    };

    const toMph = (windSpeed : number) => {
        return Math.round(windSpeed * 2.237);
    }

    const getTemperature = (temperature : number) => {
        return inCelsius ? Math.round(temperature) + "°C" : toFarenheit(temperature) + "°F";
    }

    const getWind = (windSpeed : number) => {
        return inCelsius ? Math.round(windSpeed) + "m/s" : toMph(windSpeed) + "mph";
    }

    const titleCase = (word : string) => {
        if (!word) return word;
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }

    const forceSuggestion = () => {
        setSuggestionTrigger(prev => !prev); // Toggle the state to force a re-render of ClothesBlock
      };

    return (<div className='weather'>
                {weatherData ? (
                    <div>
                        <h1> {city} {weatherIcon ? 
                        <img src={OPENWEATHERMAP_ICON_URL_PREFIX + weatherIcon + "@2x.png"} alt={weatherCondition}/> 
                        : null} </h1>
                        <p className="info">
                            {getTemperature(temperature) ? <span>Currently: {getTemperature(temperature)} {""}</span> : null} 
                            {getTemperature(lowTemperature) && getTemperature(highTemperature) ? <span>({getTemperature(lowTemperature)} ~ {getTemperature(highTemperature)})</span> : null}
                            {getTemperature(feelsLikeTemperature) ? <span>{" - "}Feels like: {getTemperature(feelsLikeTemperature)}</span> : null} 

                            <button onClick={() => setInCelsius(!inCelsius)} className="button-toggle">
                            to {inCelsius ? "°F" : "°C"}</button>
                        </p>
                        {getWind(wind) ? <p>Wind: {getWind(wind)}</p> : null}
                        <p>Condition: {titleCase(weatherData.weather[0].description)}</p>
                    </div>
                ) : (
                    <p>No weather data available</p>
                )}
                <div className="clothes-content">
                    <ClothesBlock 
                        highTemperature={toFarenheit(highTemperature)} 
                        lowTemperature={toFarenheit(lowTemperature)} 
                        feelsLikeTemperature={toFarenheit(feelsLikeTemperature)} 
                        suggestionTrigger={suggestionTrigger}/>
                </div>
                <RefreshButton action={forceSuggestion} text="Refresh Suggestion" />

            <Button onClick={goBack} text="Back"/>
    </div>)
}

export default Weather;