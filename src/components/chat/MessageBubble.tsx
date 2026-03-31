import './Chat.css'
import { MessageBubbleMeta, type SendStatus} from './MessageBubbleMeta';


interface UserBubbleProps {
    role: 'user';
    message: string;
    timestamp: string;
    status: SendStatus;
}

interface CharacterBubbleProps {
    role: 'character';
    message: string;
    timestamp: string;
    characterName: string;
    showName: string;
    status?: never;
}

export type MessageBubbleProps = UserBubbleProps | CharacterBubbleProps;

export function MessageBubble(props: MessageBubbleProps) {
    const { role, message, timestamp } = props;
    const isUser = role === 'user';

    return (
        <div className={`bubble-row bubble-row--${role}`}>
            <div>
                {!isUser && (
                    <div>
                        <span className="bubble-row__character-name">{props.characterName}</span>
                         <span>{props.showName}</span>
                    </div>
                )}

                <p>{message}</p>

                <MessageBubbleMeta timestamp={timestamp} status={isUser ? props.status : undefined} />
            </div>

        </div>
    )
}