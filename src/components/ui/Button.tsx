import React from 'react';
// import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export function Button({
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false, 
    leftIcon, 
    rightIcon, 
    className = '',
    ...props
}: ButtonProps) {
    return (
        <button
            className={`btn ${variant} ${size} ${disabled ? 'disabled' : ''} ${className}`}
            disabled={disabled}
            {...props}
        >
            {leftIcon && <span className="btn-icon left">{leftIcon}</span>}
            {children || props.label}
            {rightIcon && <span className="btn-icon right">{rightIcon}</span>}
        </button>
    )
}