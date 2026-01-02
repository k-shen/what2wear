import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import { BASE_URL } from './model/constants';
import Result from './Result';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path={BASE_URL} element={<Home />} />
                <Route path={BASE_URL + '/result'} element={<Result />} />
            </Routes>
        </Router>
    );
};

export default App;
