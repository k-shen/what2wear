# what2wear 👕🌤️

A smart weather-based clothing recommendation app that suggests what to wear based on current weather conditions or forecasts.

## Features

- **Real-time Weather Data**: Get current weather conditions for your location
- **Weather Forecasts**: View 3-hour, 9-hour, 3-day, or 5-day forecasts
- **Smart Clothing Suggestions**: Receive personalized outfit recommendations based on temperature, wind, and weather conditions
- **Location Support**:

  - Automatic geolocation detection
  - Manual city search
- **Temperature Units**: Toggle between Celsius and Fahrenheit
- **Layering Logic**: Intelligent clothing layering suggestions for varying temperatures
- **Multiple Scenarios**: Get suggestions for dressing warmer or cooler based on forecast ranges

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Routing**: React Router DOM
- **Styling**: Bootstrap 5 + Custom CSS
- **APIs**:
  - OpenWeatherMap API (weather data)
  - OpenCage Geocoding API (location services)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/k-shen/what2wear.git
    cd what2wear
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm start` - Run the app in development mode
- `npm run build` - Build the app for production
- `npm run format` - Format code with ESLint and Prettier
- `npm run deploy` - Deploy to GitHub Pages

## How It Works

1. **Select Forecast Mode**: Choose between current weather or various forecast durations
2. **Set Location**: Use your current location or search for a city
3. **Get Recommendations**: The app analyzes temperature, feels-like temperature, and wind conditions
4. **View Suggestions**: See clothing recommendations including:
   - Tops (short sleeve, long sleeve, hoodie, jacket, coat)
   - Bottoms (shorts, light pants, heavy pants)
   - Layering combinations for optimal comfort

## Clothing Algorithm

The app uses a warmth-based algorithm that:

- Calculates temperature differences from a comfort baseline (75°F)
- Suggests appropriate clothing layers based on the difference
- Provides alternative options for warmer/cooler preferences
- Considers wind speed and feels-like temperature
- Handles forecast ranges with multiple scenarios

## Deployment

The app is deployed on GitHub Pages: [https://k-shen.github.io/what2wear](https://k-shen.github.io/what2wear)

To deploy your own version:

```bash
npm run deploy
```

## License

This project is private and not licensed for public use.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Geocoding services by [OpenCage](https://opencagedata.com/)
