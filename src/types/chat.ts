import type { SendStatus } from "../components/chat/MessageBubbleMeta";


export interface Message {
  role: 'user' | 'character';
  message: string;
  // timestamp: string;
  date: string;
    characterName?: string;
    showName?: string;
  status: SendStatus;
}

export interface Quote {
  quote: string;
  character: string;
  show: string;
}

export interface ChatResponse {
  quote: Quote;
}