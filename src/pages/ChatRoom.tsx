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

export function ChatRoom ({
    initialMessages = [],
    welcomeMessage, 
    typingIndicator = false
}: ChatRoomProps) {
    const { messages, handleSend } = useChat(initialMessages);

    return (
        <div className="chat-room">
            <MessageList
                messages={messages}
                welcomeMessage={welcomeMessage ?? "start a chat with anime characters!"}
                typingIndicator ={typingIndicator === true ? { characterName: 'Character', showName: 'Show' } : typingIndicator}
            />
            <MessageInput 
                onSend={handleSend} 
            />
        </div>
    );
}

export default ChatRoom;