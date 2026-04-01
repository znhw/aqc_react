import { useChat } from '../hooks/useChat';
import { MessageList } from '../components/chat/MessageList';
import { MessageInput } from '../components/chat/MessageInput';
import type { Message } from '../types/chat';
import type {  TypingState } from '../components/chat/MessageList';

export interface ChatRoomProps {
    initialMessages?: Message[];
    welcomeMessage?: string;
    typingIndicator?: TypingState | boolean;
}

export function ChatRoom({
    initialMessages = [],
    welcomeMessage, 
    typingIndicator = false
}: ChatRoomProps) {
    const { messages, handleSend } = useChat(initialMessages);

    // function handleSend(text: string) {
    //     const now = new Date().toISOString();

    //     const newMessage: Message = {
    //         role: 'user',
    //         message: text,
    //         timestamp: now,
    //         date: now.split('T')[0], // Extract date portion
    //         status: 'sent'
    //     };
        
    //     setMessages((prev) => [...prev, newMessage]);
    // }

    return (
        <div className="chat-room">
            <MessageList
                messages={messages}
                welcomeMessage={welcomeMessage}
                typingIndicator ={typingIndicator === true ? { characterName: 'Character', showName: 'Show' } : typingIndicator}
            />
            <MessageInput onSend={handleSend} />
        </div>
    );
}