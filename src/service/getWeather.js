export const getWeather = async (latitude, longitude) => {
    const API_KEY = 'eae60fbb1fd9288abfb10beb4a5d6ded';
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );
    return response.json();
};
