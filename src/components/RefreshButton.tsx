import React from 'react';

import refresh from '../styles/refresh.svg';

const RefreshButton = ({ action, text }) => {
    return (
        <button onClick={action} className="refresh-button" title={text}>
            <img src={refresh} alt={text} />
        </button>
    );
};

export default RefreshButton;
