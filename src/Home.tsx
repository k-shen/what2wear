import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './components/Button';
import { BASE_URL, W2W_BUTTON_TEXT } from './components/constants';
import DefaultLocation from './components/DefaultLocation';
import LocationInput from './components/LocationInput';
import Time from './components/Time';
import { getDefaultLocation, getCityFromCoordinate } from './service/getLocation';
import { getWeather } from './service/getWeather';

import './styles/home.css';

function Home() {
    const navigate = useNavigate();
    const [defaultLocation, setDefaultLocation] = useState(null);
    const [inputLocation, setInputLocation] = useState(null);
    const [mainButtonText, setMainButtonText] = useState(W2W_BUTTON_TEXT);

    useEffect(() => {
        getDefaultLocation().then(setDefaultLocation).catch(console.error);
    }, []);

    const handleWhat2Wear = async () => {
        const location = inputLocation || defaultLocation;

        if (!location) {
            setMainButtonText('Please enter a valid location');
            return;
        }

        try {
            const response = await getWeather(location.latitude, location.longitude);
            const city = await getCityFromCoordinate(location.latitude, location.longitude);
            navigate(BASE_URL + '/result', {
                state: { weatherData: response, city }
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
