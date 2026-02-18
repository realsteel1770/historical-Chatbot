import React from 'react'; 
import './design/sidebar.css'; // Imports CSS for sidebar styling
import neilArmstrong from "./assets/neilarmstronganimated.png"; // Imports profile image - Neil Armstrong

// Sidebar component with buttons and profile image
export default function Sidebar({ 
  onNewChat,               // Start a new chat
  onReadLast,              // Read the last message aloud
  onToggleTheme,           // Switch color-blind mode / theme
  themeIndex,              // Current theme number for styling
  conversation,            // Current chat data
  onDownloadConversation   // Save conversation to a file
}) {
  return (
    // Sidebar wrapper with theme styling
    <div className={`sidebar-body theme-${themeIndex}`}>
      <div className="sidebar-container">

        {/* Profile image section */}
        <div className="profile-section">
          <img
            src={neilArmstrong} 
            alt="Neil Armstrong cartoon" // alt tag
            className="neil" 
            style={{ width: "240px", height: "auto" }}
          />
        </div>

        {/* Buttons for sidebar actions */}
        <div className="button-container">
          <button onClick={onNewChat} className="sidebar-btn">Start new chat</button>
          <button onClick={onReadLast} className="sidebar-btn">Text to speech</button>
          <button onClick={onToggleTheme} className="sidebar-btn">Toggle Color-Blind Mode</button>
          <button
            className="sidebar-btn"
            onClick={() => {
              // Ask before downloading conversation
              if (window.confirm("Please confirm you would like to download this current conversation.")) {
                onDownloadConversation(conversation);
              }
            }}
          >
            Download Conversation
          </button>
        </div>
      </div>
    </div>
  );
}
