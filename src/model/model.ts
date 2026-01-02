export interface WeatherData {
    weatherCondition?: string;
    weatherDescription?: string;
    weatherIcon?: string;
    temperature: number;
    feelsLikeTemperature: number;
    lowTemperature: number;
    highTemperature: number;
    wind: number;
    place?: string;
    mode: string;
}

export interface Clothes {
    name: string;
    warmth: number;
}

export const TOPS: Clothes[] = [
    { name: 'Short Sleeve Shirt', warmth: 4 },
    { name: 'Long Sleeve Shirt', warmth: 8 },
    { name: 'Hoodie/Sweatshirt', warmth: 16 },
    { name: 'Jacket', warmth: 25 },
    { name: 'Coat', warmth: 37 },
    { name: 'Heavy Coat', warmth: 49 }
];

export const UNLAYERABLE_TOP_INDICIES = [5, 4, 3];

export const BOTTOMS: Clothes[] = [
    { name: 'Shorts', warmth: 3 },
    { name: 'Light Pants', warmth: 5 },
    { name: 'Heavy Pants', warmth: 8 }
];
