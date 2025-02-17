import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { BASE_URL } from './components/constants';
import Home from './Home';
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
