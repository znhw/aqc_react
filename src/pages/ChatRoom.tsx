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
                        <div className='info-content'>
                            <p>
                            Share what's on your mind, whether it's a feeling, a memory, or a random thought, and the app will match you with quotes that relate with your moment.
                            </p>
                            <p>
                                For support or feedback, please reach out at <a href="mailto:animeness@hotmail.com">animeness@hotmail.com</a>
                            </p>
                        </div>
                    </Popover.Content>
                </Popover>
            </div>
            <MessageList
                messages={messages}
                welcomeMessage={welcomeMessage ?? "what's on your mind?"}
                typingIndicator ={isTyping}
            />
            <MessageInput 
                onSend={handleSend} 
            />
        </div>
    );
}

export default ChatRoom;