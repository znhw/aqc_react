import { useChat } from '../hooks/useChat';
import { MessageList } from '../components/chat/MessageList';
import { MessageInput } from '../components/chat/MessageInput';
import type { Message } from '../types/chat';
import { Popover } from '../components/ui/Popover';

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
            <div className='chat-room-header'>
                <Popover>
                    <Popover.Trigger>
                        <button>𝓲</button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <p className='info-content'>This is some information about the app.</p>
                    </Popover.Content>
                </Popover>
            </div>
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