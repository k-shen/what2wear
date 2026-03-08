import React from 'react';

import refresh from '../styles/refresh.svg';

interface RefreshButtonProps {
    action: () => void;
    text: string;
}

const RefreshButton = ({ action, text }: RefreshButtonProps) => {
    return (
        <button onClick={action} className="refresh-button" title={text}>
            <img src={refresh} alt={text} />
        </button>
    );
};

export default RefreshButton;
