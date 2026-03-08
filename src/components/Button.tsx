import React from 'react';
import '../styles/button.css';

interface ButtonProps {
    onClick: () => void;
    text: string;
}

const Button = ({ onClick, text }: ButtonProps) => {
    return (
        <button onClick={onClick} className="button">
            {text}
        </button>
    );
};

export default Button;
