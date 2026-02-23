import { useState, useRef } from "react";
import { useChat } from "./hooks/useChat";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { ChatMessage } from "./components/ChatMessage";
import { TypingIndicator } from "./components/TypingIndicator";
import { EmptyState } from "./components/EmptyState";
import { InputArea } from "./components/InputArea";
import { THEMES } from "./data/chatData";

export default function App() {
  const { messages, isLoading, handleSend, handleReadLast, downloadChat } = useChat();
  const [themeIndex, setThemeIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const theme = THEMES[themeIndex];

  function toggleTheme() {
    setThemeIndex(prev => (prev + 1) % THEMES.length);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=IBM+Plex+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${theme.bg}; color: ${theme.text}; font-family: 'IBM Plex Mono', monospace; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>

      {/* Starfield */}
      <div aria-hidden="true" style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `
          radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.6) 0%, transparent 100%),
          radial-gradient(1px 1px at 25% 40%, rgba(255,255,255,0.4) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 50% 8%, rgba(255,255,255,0.7) 0%, transparent 100%),
          radial-gradient(1px 1px at 70% 25%, rgba(255,255,255,0.5) 0%, transparent 100%),
          radial-gradient(1px 1px at 85% 60%, rgba(255,255,255,0.4) 0%, transparent 100%),
          radial-gradient(2px 2px at 90% 10%, rgba(255,255,255,0.8) 0%, transparent 100%),
          radial-gradient(1px 1px at 15% 85%, rgba(255,255,255,0.5) 0%, transparent 100%)
        `,
      }} />

      <div style={{ display: "flex", height: "100vh", position: "relative", zIndex: 1 }}>
        <Sidebar
          theme={theme}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onReadLast={handleReadLast}
          onDownload={downloadChat}
          onToggleTheme={toggleTheme}
        />

        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          <Header onOpenSidebar={() => setSidebarOpen(true)} />

          <div
            role="log"
            aria-live="polite"
            aria-label="Conversation"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              scrollbarWidth: "thin",
              scrollbarColor: `${theme.accent}33 transparent`,
            }}
          >
            {messages.length === 0 && !isLoading
              ? <EmptyState onSuggest={handleSend} />
              : messages.map((msg, i) => <ChatMessage key={i} msg={msg} />)
            }
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <InputArea onSend={handleSend} isLoading={isLoading} />
        </main>
      </div>
    </>
  );
}