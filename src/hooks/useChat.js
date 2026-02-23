import { useState } from "react";
import { speakText } from "../TextToSpeech";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend(text) {
    const userText = text.trim();
    if (!userText) return;
    setIsLoading(true);
    setMessages(prev => [...prev, { sender: "user", text: userText }]);

    try {
      const response = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userText }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { sender: "neil", text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { sender: "system", text: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReadLast() {
    if (messages.length > 0) speakText(messages[messages.length - 1].text);
    else speakText("There are no messages to read.");
  }

  function downloadChat() {
    if (!messages.length) return alert("No conversation to download yet.");
    const text = messages
      .map(m => `${m.sender === "user" ? "You" : m.sender === "neil" ? "Neil Armstrong" : "System"}: ${m.text.trim()}`)
      .join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "conversation-neil-armstrong.txt"; a.click();
    URL.revokeObjectURL(url);
  }

  return { messages, isLoading, handleSend, handleReadLast, downloadChat };
}