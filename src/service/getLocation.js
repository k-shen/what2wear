import { OPENCAGE_API_KEY } from '../model/constants';

export const getDefaultLocation = async () => {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject('Failed to retrieve location: ' + error.message);
                }
            );
        } else {
            reject('Geolocation not supported.');
        }
    });
};

export const getInputLocation = async (location) => {
    try {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?key=${OPENCAGE_API_KEY}&q=${encodeURIComponent(
                location
            )}`
        );

        const data = await response.json();
        console.log(data);
        if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            return [lat, lng];
        } else if (data.status.code == 401) {
            return [0, 0];
        } else {
            console.error('Location not found');
            return [-1, -1];
        }
    } catch (error) {
        console.error('Error fetching location');
        console.error(error);
        return [0, 0];
    }
};

export const getCityFromCoordinate = async (lat, lng) => {
    try {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}`
        );
        const data = await response.json();

        console.log(data);

        const city =
            data.results[0]?.components?.city ||
            data.results[0]?.components?.town ||
            data.results[0]?.components?.village ||
            'Current Location';

        let place;

        if (data.results[0]?.components.country == 'United States') {
            place =
                city != 'Current Location'
                    ? city +
                      ', ' +
                      data.results[0].components.state_code +
                      ', ' +
                      data.results[0].components.country
                    : 'Current Location';
        } else {
            place =
                city != 'Current Location'
                    ? city + ', ' + data.results[0].components.country
                    : 'Current Location';
        }

        return place;
    } catch (error) {
        console.error('Error finding the City');
        console.error(error);
        return 'Unknown Location';
    }
};
