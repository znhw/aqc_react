import React from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import type { SendStatus } from './MessageBubbleMeta';
import './Chat.css';

export interface Message {
    // id: string;
    role: 'user' | 'character';
    message: string;
    // timestamp: string;
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
                <div className="welcome-message">{`Welcome, ${welcomeMessage}!`}</div>
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

    messages.forEach((msg, index) => {
        
        elements.push(
            msg.role === 'user' ? (
                <MessageBubble 
                    key={index}
                    role="user" 
                    message={msg.message}
                    // timestamp={msg.timestamp}
                    status={msg.status ?? 'sent'}
                />  
            ) : (
                <MessageBubble 
                    key={index}
                    role="character"
                    message={msg.message}
                    // timestamp={msg.timestamp}
                    characterName={msg.characterName ?? ''}
                    showName={msg.showName ?? ''}
                />
            )
        );
    }
    );
    return elements;
}


