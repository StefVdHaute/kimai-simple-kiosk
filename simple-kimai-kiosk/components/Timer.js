import React, { useState, useEffect } from 'react';

function Timer({ startTime }) {
    const [timeElapsed, setTimeElapsed] = useState(0);

    const updateTimer = () => {
        const currentTime = new Date();
        const elapsedTime = currentTime - startTime;
        setTimeElapsed(elapsedTime);
    };

    useEffect(() => {
        updateTimer();

        const intervalId = setInterval(() => {
            updateTimer();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [startTime]);

    // Convert elapsed milliseconds to a readable format
    const formatTime = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        return `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    };

    return (
        <div>
            <h2>{formatTime(timeElapsed)}</h2>
        </div>
    );
}

export default Timer;
