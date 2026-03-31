import React from "react";
// import './IconButton.css';

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost';
export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    label: string, 
    loading?: boolean,
    active?: boolean
}

export function IconButton({
    icon,
    variant = 'primary',
    size = 'medium',
    label,
    disabled = false,
    loading = false,
    active = false,
    className = '',
    ...props
}: IconButtonProps) {
    return (
        <button
            className={`icon-btn ${variant} ${size} ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''} ${active ? 'active' : ''} ${className}`}
            disabled={disabled || loading}
            aria-label={label}
            {...props}
        >
            {icon}
        </button>
    )
}   