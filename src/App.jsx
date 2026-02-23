import { useState, useEffect } from "react"; 
import "./index.css"; // Global CSS styles
import Sidebar from "./sidebar.jsx"; // Sidebar component
import { speakText } from "./TextToSpeech"; // Text-to-speech helper
import "./design/theme.css";

export default function ChatBox() {
  const [message, setMessage] = useState(""); // Current input value
  const [messages, setMessages] = useState([]); // List of chat messages
  const [themeIndex, setThemeIndex] = useState(0); // Current theme index

  // Toggle between 4 themes (Colourblind mode)
  function toggleTheme() {
    setThemeIndex(prev => (prev + 1) % 4); 
  }

  // Update body class when theme changes
  useEffect(() => {
    document.body.className = `theme-${themeIndex}`;
  }, [themeIndex]);

  // Update message state as user types
  function handleChange(e) {
    setMessage(e.target.value);
  }

  // Handle sending a message
  async function handleSend() {
    if (message.trim() === "") return; // Ignore empty messages
 
    const userText = message; // Save current message
    setMessage(""); // Clear input
 
    // Adds user message to chat 
    setMessages(prev => [...prev, { sender: "user", text: " " + userText }]);
 
    try {
      // Sends message to backend
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userText })
      });
 
      const data = await response.json();
     
      // Adds response from Neil to chat
      setMessages(prev => [...prev, { sender: "neil", text: data.reply }]);

      // Shows error when no good response can be given
    } catch (error) { 
      console.error(error);
      setMessages(prev => [...prev, "System: Connection Error"]); 
    }
  }

  // Text-to-speech / Accessibility feature
  function handleReadLastMessage() {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]; 
      speakText(lastMessage.text);
    } else {
      speakText("There are no messages to read.");
    }
  }

    // Download chat history as a text file
  function downloadConversationAsTxt(conversation) {
    if (!conversation || conversation.length === 0) {
      alert("No conversation to download yet."); // Stop if no messages
      return;
    }

    // Convert messages to text lines
    const textContent = conversation
      .map(msg => {
        if (!msg?.text) return ""; // Skip empty messages
        const sender = msg.sender === "user" ? "User" : msg.sender === "neil" ? "Neil Armstrong" : "System";
        return `${sender}: ${msg.text.trim()}`; // Format each message
      })
      .filter(line => line !== "") // Remove empty lines
      .join("\n"); // Join lines with newlines

    if (!textContent) {
      alert("No conversation to download yet."); // Stop if all messages were empty
      return;
    }

    // Create a file and trigger download
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "conversation.txt"; // Set file name
    a.click(); // Start download

    URL.revokeObjectURL(url); // Clean up
  }

  

  return (
    <div className="app-container">
      <Sidebar
        onNewChat={() => window.location.reload()} // Starts new chat
        onReadLast={handleReadLastMessage} // Reads last message
        onToggleTheme={toggleTheme} // Switch theme
        themeIndex={themeIndex} 
        conversation={messages}
        onDownloadConversation={downloadConversationAsTxt} // Download chat
      />
  
      <div className="chat-container">
        <header><h1>Ask Neil Armstrong a Question!</h1></header>
        <div className="chatbox" aria-live="polite">
          {/* Display chat messages */}
          {messages.map((msg, i) => (
            <div key={i} className="message">
              <strong>{msg.sender === "user" ? "User" : "Neil Armstrong"}:</strong>
              {msg.text}
            </div>
          ))}
  
          <label htmlFor="Input" className="sr-only">Type your message</label>
  
          {/* Message input */}
          <input
            id="Input"
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend(); // Send message on Enter
              }
            }}
            placeholder="Type your message..." // What User sees
          />
          {/*Sends Message when Clicked*/}
          <button onClick={handleSend}>Send</button> 
        </div>
      </div>
    </div>
  );   
}
