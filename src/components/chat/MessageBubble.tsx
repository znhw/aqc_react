import './Chat.css'
import { MessageBubbleMeta, type SendStatus} from './MessageBubbleMeta';


interface UserBubbleProps {
    role: 'user';
    message: string;
    // timestamp: string;
    status: SendStatus;
}

interface CharacterBubbleProps {
    role: 'character';
    message: string;
    // timestamp: string;
    characterName: string;
    showName: string;
    status?: never;
}

export type MessageBubbleProps = UserBubbleProps | CharacterBubbleProps;

export function MessageBubble(props: MessageBubbleProps) {
    const { role, message } = props;
    const isUser = role === 'user';

    return (
        <div className={`bubble-row bubble-row--${role}`}>
            <div className='message_bubble'>
                {!isUser && (
                    <div className='message_text'>
                        <p className="bubble-row__character-name">{props.characterName} &nbsp;</p>
                         <p className="bubble-row__show-name"> ({props.showName}):  &nbsp;</p>
                        <p>{message}</p>
                    </div>
                )}
                {isUser && 
                    <div className='message_text'>
                        <p>You:   &nbsp; </p>
                        <p>{message}</p>
                    </div>
                }
                <MessageBubbleMeta status={isUser ? props.status : undefined} />
            </div>

        </div>
    )
}