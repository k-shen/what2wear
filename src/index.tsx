import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './styles/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
    console.error('root not found!');
} else {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
