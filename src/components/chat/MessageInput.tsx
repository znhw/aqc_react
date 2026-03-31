import React, { useState, useCallback, useRef } from 'react';
import { TextArea } from '../ui/TextArea';
import { IconButton } from '../ui/IconButton';
import '../ui/Primitives.css';

export interface MessageInputProps {
    placeholder?: string;
    onSend: (message: string) => void;
    maxRows?: number;
}

export function MessageInput({
    onSend,
    placeholder = 'Type your message...',
    maxRows = 6,
}: MessageInputProps) {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const isEmpty = message.trim() === '';

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    const handleSend = useCallback(() => {
        const trimmed = message.trim();
        if (!trimmed) return;
        onSend(trimmed);
        setMessage('');
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
        textareaRef.current?.focus();
    }, [message, onSend]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <div className="message-input-wrapper">
            <TextArea
                ref={textareaRef}
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                maxRows={maxRows}
                className="message-textarea"
                aria-label='Type a message'
            />
            { !isEmpty && <div className="divider" aria-hidden="true"/> }
            <IconButton
                icon={<span className="send-icon">➤</span>}
                label="Send message"
                onClick={handleSend}
                disabled={isEmpty}
                className="send-button"
            />
        </div>
    )
}