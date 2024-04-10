'use client';
import React from 'react';

const OButton = ({ color, title, border, onClick }) => {
    const buttonStyle = {
        backgroundColor: color,
        border: border,
        padding: '10px 20px',
        borderRadius: '5px',
        color: '#fff',
        cursor: 'pointer',
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button style={buttonStyle} onClick={handleClick}>
            {title}
        </button>
    );
};

export default OButton;