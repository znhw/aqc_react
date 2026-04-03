import { useState, useRef } from 'react';
import { fetchQuote } from '../services/chatServices';
import type { Message } from '../types/chat';

const DEBOUNCE_MS = 2000; // wait 2s after last message before sending

export function useChat(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const bufferRef = useRef<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function addUserMessage(text: string): Message {
    const now = new Date().toISOString();
    const message: Message = {
      role: 'user',
      message: text,
      timestamp: now,
      date: now.split('T')[0],
      status: 'sent',
    };
    setMessages((prev) => [...prev, message]);
    return message;
  }

  function addAssistantMessage(quote: string, character: string, show: string) {
    const now = new Date().toISOString();
    const message: Message = {
      role: 'character',
      message: quote,
      characterName: character,
      showName: show,
      timestamp: now,
      date: now.split('T')[0],
      status: 'delivered',
    };
    setMessages((prev) => [...prev, message]);
  }

  async function flushBuffer() {
    const pending = [...bufferRef.current];
    bufferRef.current = [];

    if (pending.length === 0) return;

    setIsTyping(true);
    try {
      const data = await fetchQuote(pending);
      addAssistantMessage(data.quote.quote, data.quote.character, data.quote.show);
    } catch {
      // mark last user message as errored
      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1 ? { ...m, status: 'failed' } : m
        )
      );
    } finally {
      setIsTyping(false);
    }
  }

  function handleSend(text: string) {
    addUserMessage(text);
    bufferRef.current.push(text);

    // reset the debounce timer on every new message
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(flushBuffer, DEBOUNCE_MS);
  }

  return { messages, isTyping, handleSend };
}