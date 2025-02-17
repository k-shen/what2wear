import React, { useEffect, useState } from 'react';
import { getCityFromCoordinate } from '../service/getLocation';

const DefaultLocation = ({ longitude, latitude, onLocationDetermined }) => {
    const [locationInfo, setLocationInfo] = useState<string>();

    useEffect(() => {
        const fetchCityFromCoordinates = async () => {
            if (latitude && longitude) {
                const city = await getCityFromCoordinate(latitude, longitude);
                setLocationInfo(city);
            } else {
                setLocationInfo('Loading...');
            }
        };

        fetchCityFromCoordinates();
    }, [longitude, latitude]);

    useEffect(() => {
        if (locationInfo && locationInfo !== 'Loading...') {
            onLocationDetermined(locationInfo);
        }
    }, [locationInfo, onLocationDetermined]);

    return (
        <div className="p-4 bg-gray-100 rounded-xl">
            {locationInfo ? <p>Default location: {locationInfo}</p> : <p>Loading location...</p>}
        </div>
    );
};

export default DefaultLocation;
