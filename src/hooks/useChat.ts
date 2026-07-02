import { useState } from 'react';
import { fetchQuote } from '../services/chatServices';
import type { Message } from '../types/chat';


export function useChat(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  function addUserMessage(text: string): Message {
    const now = new Date().toISOString();
    const message: Message = {
      role: 'user',
      message: text,
      // timestamp: now,
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
      // timestamp: now,
      date: now.split('T')[0],
      status: 'sent',
    };
    setMessages((prev) => [...prev, message]);
  }

  async function sendMessage(text: string) {
    setIsTyping(true);

    try {
      const data = await fetchQuote([text]);

      addAssistantMessage(
        data.quote.quote,
        data.quote.character,
        data.quote.show
      );
    } catch {
      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1 ? { ...m, status: "failed" } : m
        )
      );
    } finally {
      setIsTyping(false);
    }
  }

  function handleSend(text: string) {
    addUserMessage(text);
    sendMessage(text);
   
  }

  return { messages, isTyping, handleSend };
}