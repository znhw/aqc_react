import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import './Primitives.css'

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    placeholder?: string;
    maxRows?: number;
} 

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
    {
        label,
        placeholder,
        value,
        maxRows = 6,
        className = '',
        id,
        onChange,
        style = {},
        ...props
    },
    ref
) {
    const innerRef = useRef<HTMLTextAreaElement>(null);
    
    useImperativeHandle(ref, () => innerRef.current!)

    useEffect(() => {
        const el = innerRef.current;
        if (!el) return;

        // 1. Reset height to shrink if text was deleted
        el.style.height = '0px'; 

        // 2. Get computed styles to find line-height and padding
        const computed = window.getComputedStyle(el);
        const lineHeight = parseFloat(computed.lineHeight);
        const paddingTop = parseFloat(computed.paddingTop);
        const paddingBottom = parseFloat(computed.paddingBottom);
        
        // Total height of the text content
        const contentHeight = el.scrollHeight;
        
        // Calculate max allowed height based on maxRows
        // We add padding back because scrollHeight includes it
        const maxHeight = (lineHeight * maxRows) + paddingTop + paddingBottom;

        if (contentHeight > maxHeight) {
            el.style.height = `${maxHeight}px`;
            el.style.overflowY = 'auto';
        } else {
            el.style.height = `${contentHeight}px`;
            el.style.overflowY = 'hidden';
        }
    }, [value, maxRows]);

    return (
            <textarea
                ref={innerRef}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`textarea-field ${className}`}
                style={{ resize: 'none', ...style }}
                {...props}
            />
    )
})

