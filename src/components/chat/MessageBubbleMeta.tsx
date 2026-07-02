import './Chat.css'
// import { formatDate } from '../../utils/formatDate';

export type SendStatus =  'sent' | 'failed';

export interface MessageBubbleMetaProps {
    // timestamp: string;
    status?: SendStatus;
}

export function MessageBubbleMeta({  status }: MessageBubbleMetaProps) {
    return (
        <div>
            {/* <span>{formatDate(timestamp)}</span> */}
            {status && (
                <span aria-label={status}>
                    <StatusIcon status={status} />
                </span>
            )}
        </div>
)}

function StatusIcon({ status }: { status: SendStatus }) {
    switch (status) {
        case 'sent':
            return (
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            )
        case 'failed':
            return (
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f0f0f0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            )
        }
    }   