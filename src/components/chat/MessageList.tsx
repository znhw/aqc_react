import React from 'react';
import { MessageBubble } from './MessageBubble';
import { DateDivider } from './DateDivider';
import { TypingIndicator } from './TypingIndicator';
import { formatDate } from '../../utils/formatDate';
import type { SendStatus } from './MessageBubbleMeta';

export interface Message {
    // id: string;
    role: 'user' | 'character';
    message: string;
    timestamp: string;
    date?: string;
    characterName?: string;
    showName?: string;
    status?: SendStatus;
}

export interface TypingState {
  characterName?: string
  showName?: string
}

export interface MessageListProps {
    messages: Message[];
    welcomeMessage?: string;
    typingIndicator?: TypingState | boolean;
}

export function MessageList({ 
    messages, 
    welcomeMessage, 
    typingIndicator = false 
}: MessageListProps) {
    const hasMessages = messages.length > 0;

    return (
        <div className="message-list">
            {!hasMessages && welcomeMessage && (
                <div className="welcome-message">{welcomeMessage}</div>
            )} 

            {hasMessages && renderWithDateDividers(messages)}

            {typingIndicator && (
                <TypingIndicator />
            )}
        </div>
    );
}

function renderWithDateDividers(messages: Message[]) {
    const elements: React.ReactNode[] = [];
    let lastDate: string | undefined;

    messages.forEach((msg, index) => {
        if (msg.date && msg.date !== lastDate) {
            elements.push(
                <DateDivider key={`divider-${index}`} date={formatDate(msg.date)} />
            );
            lastDate = msg.date;
        }
        
        elements.push(
            msg.role === 'user' ? (
                <MessageBubble 
                    key={index}
                    role="user" 
                    message={msg.message}
                    timestamp={msg.timestamp}
                    status={msg.status ?? 'sent'}
                />  
            ) : (
                <MessageBubble 
                    key={index}
                    role="character"
                    message={msg.message}
                    timestamp={msg.timestamp}
                    characterName={msg.characterName ?? ''}
                    showName={msg.showName ?? ''}
                />
            )
        );
    }
    );
    return elements;
}


