import React, { useState } from 'react';
import { getInputLocation } from '../service/getLocation';
import '../styles/location.css';

interface LocationInputProps {
    onLocationSelected: (location: string, coordinates: { lat: number; lng: number }) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationSelected }) => {
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    const handleLocationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!location.trim()) {
            setError('Please enter a valid location.');
            return;
        }

        try {
            const [latitude, longitude] = await getInputLocation(location);

            if (latitude === 0 && longitude === 0) {
                setError('Error fetching location. Please try again later.');
            } else if (latitude === -1 && longitude === -1) {
                setError('Location not found. Please try again.');
            } else {
                onLocationSelected(location, { lat: latitude, lng: longitude });
            }
        } catch (error) {
            console.error(error);
            setError('Error fetching location. Please try again later.');
        }
    };

    return (
        <div className="input-container">
            <p>Or enter city or ZIP code: </p>
            <form onSubmit={handleLocationSubmit} className="input-location">
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location..."
                />
                <button type="submit" className="input-button">
                    Set Location
                </button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
};

export default LocationInput;
