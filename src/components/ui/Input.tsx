import React, { forwardRef } from 'react';
// import './Input.css';

export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    inputSize?: InputSize;
    error?: boolean;
    label?: string;
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    {
        size = 'medium',
        error = false,
        label,
        prefixIcon,
        suffixIcon,
        className = '',
        id,
        ...props
    },
    ref
) {
    const inputId = id  ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    return (
        <div className={`input-wrapper ${size} ${error ? 'error' : ''} ${className}`}>
            {label && <label htmlFor={inputId} className="input-label">{label}</label>}
            <div className="input-container">
                {prefixIcon && <span className="input-icon prefix">{prefixIcon}</span>}
                <input
                    id={inputId}
                    ref={ref}
                    className="input-field"
                    {...props}
                />
                {suffixIcon && <span className="input-icon suffix">{suffixIcon}</span>}
            </div>
        </div>
    )
})