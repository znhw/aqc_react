import type { ChatResponse } from '../types/chat';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function fetchQuote(messages: string[]): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}