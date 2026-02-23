import { useState, useRef } from "react";

export function InputArea({ onSend, isLoading }) {
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  function handleSend() {
    if (!message.trim() || isLoading) return;
    onSend(message);
    setMessage("");
    inputRef.current?.focus();
  }

  return (
    <div style={{
      padding: "16px 24px 20px",
      borderTop: "1px solid rgba(79,195,247,0.13)",
      background: "rgba(15,23,41,0.8)",
      backdropFilter: "blur(12px)",
      flexShrink: 0,
    }}>
      <div style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-end",
        background: "#0a0e1a",
        border: `1px solid ${message.length > 0 ? "rgba(79,195,247,0.6)" : "rgba(79,195,247,0.27)"}`,
        borderRadius: 14,
        padding: "10px 12px",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: message.length > 0 ? "0 0 0 3px rgba(79,195,247,0.08)" : "none",
      }}>
        <textarea
          ref={inputRef}
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
          }}
          placeholder="Transmit your message..."
          rows={1}
          maxLength={500}
          aria-label="Message input"
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            color: "#e8f4fd",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13,
            lineHeight: 1.5,
            resize: "none",
            minHeight: 20,
            maxHeight: 120,
            scrollbarWidth: "none",
            letterSpacing: "0.02em",
          }}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !message.trim()}
          aria-label="Send message"
          style={{
            width: 36, height: 36,
            borderRadius: 10,
            border: "none",
            background: "#4fc3f7",
            color: "#0a0e1a",
            cursor: isLoading || !message.trim() ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            fontSize: 14,
            fontWeight: "bold",
            opacity: isLoading || !message.trim() ? 0.3 : 1,
            transition: "all 0.2s",
          }}
        >
          ↑
        </button>
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 8,
        padding: "0 4px",
      }}>
        <span style={{ fontSize: 9, color: "#4a6fa5", letterSpacing: "0.1em" }}>
          Enter to send · Shift+Enter for new line
        </span>
        <span style={{ fontSize: 9, color: message.length > 400 ? "#ff6b6b" : "#4a6fa5", letterSpacing: "0.1em" }}>
          {message.length}/500
        </span>
      </div>
    </div>
  );
}