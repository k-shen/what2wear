import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BASE_URL } from './components/constants';
import Weather from './Result';
import Home from './Home';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path={BASE_URL} element={<Home />} />
                <Route path={BASE_URL + '/weather'} element={<Weather />} />
            </Routes>
        </Router>
    );
};

export default App;
