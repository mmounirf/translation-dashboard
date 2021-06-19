import React from 'react';
import './Button.scss';

interface Props {
    children: string | JSX.Element;
    type?: 'button' | 'reset' | 'submit';
    variant?: 'primary' | 'secondary';
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

function Button({ children, variant = 'primary', type = 'button', className = '', onClick }: Props): JSX.Element {
    const buttonClass = `button button__${variant} ${className}`;

    function _handleButtonClick(event: React.MouseEvent<HTMLElement>) {
        if (typeof onClick === 'function') {
            onClick(event);
        }
    }

    return (
        <button type={type} className={buttonClass} onClick={_handleButtonClick}>
            {children}
        </button>
    );
}

export default Button;
