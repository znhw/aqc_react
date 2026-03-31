import React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
    label?: string;
    vertical?: boolean;
    className?: string;
}

export function Divider({ 
    label, 
    vertical = false, 
    className = '', 
    ...props }: DividerProps) {
        if (vertical) {
            return (
                <span className={`divider vertical ${className}`} {...props}  aria-hidden="true"/>
            )
        }
    return (
        <div className={`divider  ${className}`} {...props} role='separator'>
            {label && <span className="divider-label">{label}</span>}
        </div>
    )
}   