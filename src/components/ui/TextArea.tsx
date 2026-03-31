import React, { forwardRef, useRef } from 'react';
import './Primitives.css'

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    placeholder?: string;
    maxRows?: number;
} 

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
    {
        label,
        placeholder,
        maxRows = 6,
        className = '',
        id,
        onChange,
        ...props
    },
    ref
) {
    const innerRef = useRef<HTMLTextAreaElement>(null);
    const resolvedRef = ref ?? innerRef;
    // const resolvedRef = ( ref ?? innerRef ) as React.RefObject<HTMLTextAreaElement>;
    const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {  
        const el = e.target;
        el.style.height = 'auto';
        const lineHeight = parseInt(getComputedStyle(el).lineHeight);
        el.style.height = Math.min(el.scrollHeight, lineHeight * maxRows) + 'px';
        onChange?.(e);
    }

    return (
        <div className={`textarea-wrapper ${className}`}>
            {label && <label htmlFor={textareaId} className="textarea-label">{label}</label>}
            <textarea
                id={textareaId}
                ref={resolvedRef}
                placeholder={placeholder}
                onChange={handleChange}
                rows={1}
                className={`textarea-field ${className}`}
                {...props}
            />
        </div>
    )
})

