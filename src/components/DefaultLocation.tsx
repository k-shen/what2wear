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
                setLocationInfo('---');
            }
        };

        fetchCityFromCoordinates();
    }, [longitude, latitude]);

    useEffect(() => {
        if (locationInfo && locationInfo !== '---') {
            onLocationDetermined(locationInfo);
        }
    }, [locationInfo, onLocationDetermined]);

    return (
        <div>
            {locationInfo ? (
                <p>
                    Default location: <strong>{locationInfo}</strong>
                </p>
            ) : (
                <p>Loading location...</p>
            )}
        </div>
    );
};

export default DefaultLocation;
