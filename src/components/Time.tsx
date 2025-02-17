import React, { useEffect, useState } from 'react';

const Time = () => {
    const [localTime, setLocalTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const currentTime = new Date().toLocaleTimeString('en-US', {
                timeZone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            setLocalTime(currentTime);
        };

        updateTime();
        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return <p>{localTime || 'Loading...'}</p>;
};

export default Time;
