import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from './components/Button';
import ClothesBlock from './components/ClothesBlock';
import RefreshButton from './components/RefreshButton';
import { BASE_URL, OPENWEATHERMAP_ICON_URL_PREFIX } from './model/constants';
import { WeatherData } from './model/model';

import './styles/result.css';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state as WeatherData;
    const goBack = () => {
        navigate(BASE_URL);
    };

    const completeData = (data) => {
        if (
            data.temperature == 'undefined' ||
            data.lowTemperature == 'undefined' ||
            data.highTemperature == 'undefined' ||
            data.feelsLikeTemperature == 'undefined' ||
            data.wind == 'undefined'
        )
            return false;

        return true;
    };

    if (!completeData(data)) {
        return (
            <div className="result">
                <p>Sorry, do not have weather data for {data.place ? data.place : 'your city'}</p>
                <Button onClick={goBack} text="Back" />
            </div>
        );
    }

    const [inCelsius, setInCelsius] = useState(false);
    const [suggestionTrigger, setSuggestionTrigger] = useState(false);

    const weatherCondition = data.weatherCondition;
    const weatherDescription = data.weatherDescription;
    const weatherIcon = data.weatherIcon;
    const temperature = data.temperature;
    const feelsLikeTemperature = data.feelsLikeTemperature;
    const lowTemperature = data.lowTemperature;
    const highTemperature = data.highTemperature;
    const wind = data.wind;

    const toFarenheit = (temperature: number) => {
        return Math.round((temperature * 9) / 5 + 32);
    };

    const toMph = (windSpeed: number) => {
        return Math.round(windSpeed * 2.237);
    };

    const getTemperature = (temperature: number) => {
        return inCelsius ? Math.round(temperature) + '°C' : toFarenheit(temperature) + '°F';
    };

    const getWind = (windSpeed: number) => {
        return inCelsius ? Math.round(windSpeed) + 'm/s' : toMph(windSpeed) + 'mph';
    };

    const titleCase = (word: string) => {
        if (!word) return word;
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    };

    const forceSuggestion = () => {
        setSuggestionTrigger((prev) => !prev); // Toggle the state to force a re-render of ClothesBlock
    };

    return (
        <div className="result">
            {completeData(data) ? (
                <div>
                    <h1>
                        {' '}
                        {data.place}{' '}
                        {weatherIcon ? (
                            <img
                                src={OPENWEATHERMAP_ICON_URL_PREFIX + weatherIcon + '@2x.png'}
                                alt={weatherCondition}
                                className="icon"
                            />
                        ) : null}{' '}
                    </h1>
                    <p className="info">
                        {getTemperature(temperature) ? (
                            <span>
                                Currently: {getTemperature(temperature)} {''}
                            </span>
                        ) : null}

                        {getTemperature(lowTemperature) && getTemperature(highTemperature) ? (
                            <span>
                                ({getTemperature(lowTemperature)} ~{' '}
                                {getTemperature(highTemperature)})
                            </span>
                        ) : null}

                        {feelsLikeTemperature && getTemperature(feelsLikeTemperature) ? (
                            <span>
                                {data.mode == 'current' ? '' : '(Avg)'} Feels like:{' '}
                                {getTemperature(feelsLikeTemperature)}
                            </span>
                        ) : null}

                        <button onClick={() => setInCelsius(!inCelsius)} className="button-toggle">
                            to {inCelsius ? '°F' : '°C'}
                        </button>
                    </p>

                    {getWind(wind) ? <p>Avg Wind: {getWind(wind)}</p> : null}

                    {weatherCondition && <p>Condition: {titleCase(weatherDescription)}</p>}
                </div>
            ) : (
                <p>No weather data available</p>
            )}

            <div className="clothes-content">
                <ClothesBlock
                    highTemperature={toFarenheit(highTemperature)}
                    lowTemperature={toFarenheit(lowTemperature)}
                    midTemperature={toFarenheit(feelsLikeTemperature)}
                    mode={data.mode}
                    suggestionTrigger={suggestionTrigger}
                />
            </div>

            <RefreshButton action={forceSuggestion} text="Refresh Suggestion" />

            <Button onClick={goBack} text="Back" />
        </div>
    );
};

export default Result;
