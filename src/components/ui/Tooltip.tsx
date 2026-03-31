import React from 'react';
// import './Primitives.css'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
    content: string;
    position?: TooltipPosition;
    children: React.ReactNode;
    className?: string; 
}

export function Tooltip({ 
    content, 
    position = 'top', 
    children, 
    className = '', 
    ...props }: 
    TooltipProps) {
    return (
        <span className={`tooltip-wrapper ${className}`} {...props}>
            {children}
            <span className={`tooltip-content ${position}`} role="tooltip">
                {content}
            </span>
        </span>
    )
}