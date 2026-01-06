import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './components/Button';
import DefaultLocation from './components/DefaultLocation';
import LocationInput from './components/LocationInput';
import Mode, { ForecastMode } from './components/Mode';
import Time from './components/Time';
import { BASE_URL, W2W_BUTTON_TEXT } from './model/constants';
import { WeatherData } from './model/model';
import { getDefaultLocation, getCityFromCoordinate } from './service/getLocation';
import { getCurrentWeather, getForecastWeather } from './service/getWeather';

import './styles/home.css';

function Home() {
    const navigate = useNavigate();
    const [defaultLocation, setDefaultLocation] = useState(null);
    const [mode, setMode] = useState<ForecastMode>('current');
    const [inputLocation, setInputLocation] = useState(null);
    const [mainButtonText, setMainButtonText] = useState(W2W_BUTTON_TEXT);

    useEffect(() => {
        getDefaultLocation().then(setDefaultLocation).catch(console.error);
    }, []);

    const getWeatherData = (response, mode, place) => {
        let data;
        if (mode == 'current') {
            data = {
                weatherCondition: response.weather[0].main,
                weatherDescription: response.weather[0].description,
                weatherIcon: response.weather[0].icon,
                temperature: response.main.temp,
                feelsLikeTemperature: response.main.feels_like,
                lowTemperature: response.main.temp_min,
                highTemperature: response.main.temp_max,
                wind: response.wind.speed,
                place: place,
                mode: mode
            };
        } else if (mode == '3hr') {
            data = extractXHourData(response, 3, place);
        } else if (mode == '9hr') {
            data = extractXHourData(response, 9, place);
        } else if (mode == '3day') {
            data = extractXHourData(response, 72, place);
        } else if (mode == '5day') {
            data = extractXHourData(response, 120, place);
        }

        return data as WeatherData;
    };

    const extractXHourData = (data, hours, place) => {
        const numberOfDataPoints = hours / 3;

        const temp = data.list[0].main.temp;
        let highTemp = data.list[0].main.temp_max;
        let lowTemp = data.list[0].main.temp_min;
        let feelsLikeTemp = 0;
        let wind = 0;

        for (let idx = 0; idx < numberOfDataPoints; idx++) {
            const threeHrData = data.list[idx];

            if (threeHrData.main.temp_max > highTemp) {
                highTemp = threeHrData.main.temp_max;
            }

            if (threeHrData.main.temp_min < lowTemp) {
                lowTemp = threeHrData.main.temp_min;
            }

            feelsLikeTemp += threeHrData.main.feels_like;
            wind += threeHrData.wind.speed;
        }

        feelsLikeTemp /= numberOfDataPoints;
        wind /= numberOfDataPoints;

        const extracted = {
            temperature: temp,
            feelsLikeTemperature: feelsLikeTemp,
            lowTemperature: lowTemp,
            highTemperature: highTemp,
            wind: wind,
            place: place,
            mode: mode
        };

        return extracted as WeatherData;
    };

    const handleWhat2Wear = async () => {
        const location = inputLocation || defaultLocation;

        if (!location) {
            setMainButtonText('Please enter a valid location');
            return;
        }

        try {
            let response;
            if (mode == 'current') {
                response = await getCurrentWeather(location.latitude, location.longitude);
            } else {
                response = await getForecastWeather(location.latitude, location.longitude);
            }

            const place = await getCityFromCoordinate(location.latitude, location.longitude);
            const data = getWeatherData(response, mode, place);
            console.log('Extracted weather', data);

            navigate(BASE_URL + '/result', {
                state: data
            });
        } catch (error) {
            console.error(error);
            setMainButtonText('Error fetching the weather');
        }
    };

    const updateButtonText = (location: string) => {
        if (!inputLocation) setMainButtonText(`${W2W_BUTTON_TEXT} for ${location}`);
    };

    return (
        <div className="home">
            <h1>Welcome to what2wear</h1>
            <Time />
            <Mode mode={mode} onModeChange={setMode} />
            <DefaultLocation
                longitude={defaultLocation?.longitude || null}
                latitude={defaultLocation?.latitude || null}
                onLocationDetermined={updateButtonText}
            />
            <LocationInput
                onLocationSelected={(location, coords) => {
                    setInputLocation({
                        latitude: coords.lat,
                        longitude: coords.lng
                    });
                    setMainButtonText(`${W2W_BUTTON_TEXT} for ${location}`);
                }}
            />
            <Button onClick={handleWhat2Wear} text={mainButtonText} />
        </div>
    );
}

export default Home;
