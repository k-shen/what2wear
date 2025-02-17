export const OPENCAGE_API_KEY = '4c8f8db32e2b4c388841d2e2a4e5ffb3';
export const OPENWEATHERMAP_ICON_URL_PREFIX = 'https://openweathermap.org/img/wn/';
export const W2W_BUTTON_TEXT = 'what 2 wear';
export const BASE_URL = '/what2wear';

export interface Clothes {
    name: string;
    warmth: number;
}

export const TOPS: Clothes[] = [
    { name: 'Short Sleeve Shirt', warmth: 4 },
    { name: 'Long Sleeve Shirt', warmth: 8 },
    { name: 'Hoodie/Sweatshirt', warmth: 14 },
    { name: 'Light Jacket', warmth: 18 },
    { name: 'Jacket', warmth: 25 },
    { name: 'Coat', warmth: 37 },
    { name: 'Heavy Coat', warmth: 45 }
];

export const UNLAYERABLE_TOP_INDICIES = [6, 5, 4, 3];

export const BOTTOMS: Clothes[] = [
    { name: 'Shorts', warmth: 3 },
    { name: 'Light Pants', warmth: 5 },
    { name: 'Heavy Pants', warmth: 8 }
];

export const COMFORT = 78;
