import { useChat } from '../hooks/useChat';
import { MessageList } from '../components/chat/MessageList';
import { MessageInput } from '../components/chat/MessageInput';
import type { Message } from '../types/chat';

export interface ChatRoomProps {
    initialMessages?: Message[];
    welcomeMessage?: string;
}

export function ChatRoom ({
    initialMessages = [],
    welcomeMessage, 
}: ChatRoomProps) {
    const { messages, isTyping, handleSend } = useChat(initialMessages);

    return (
        <div className="chat-room">
            <MessageList
                messages={messages}
                welcomeMessage={welcomeMessage ?? "start a chat with anime characters!"}
                typingIndicator ={isTyping}
            />
            <MessageInput 
                onSend={handleSend} 
            />
        </div>
    );
}

export default ChatRoom;