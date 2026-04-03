import './Chat.css'
import { formatDate } from '../../utils/formatDate';

export type SendStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface MessageBubbleMetaProps {
    timestamp: string;
    status?: SendStatus;
}

export function MessageBubbleMeta({ timestamp, status }: MessageBubbleMetaProps) {
    return (
        <div>
            <span>{formatDate(timestamp)}</span>
            {status && (
                <span aria-label={status}>
                    <StatusIcon status={status} />
                </span>
            )}
        </div>
)}

function StatusIcon({ status }: { status: SendStatus }) {
    switch (status) {
        case 'sending':
            return (
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" opacity="0.5" />
                    <polyline points="12 6 12 12 15 14" opacity="0.5" />
                </svg>
            )
        case 'sent':
            return (
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            )
        case 'delivered':
            return (
                 <svg width="18" height="14" viewBox="0 0 28 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="24 6 11 17 6 12" />
                    <polyline points="17 6 9 14" />
                 </svg>
            )
        case 'read':
            return (
                 <svg width="18" height="14" viewBox="0 0 28 24" fill="none" stroke="#6a8bff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="24 6 11 17 6 12" />
                    <polyline points="17 6 9 14" />
                </svg>
            )
        case 'failed':
            return (
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6a6a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            )
        }
    }   