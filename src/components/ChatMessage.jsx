export function ChatMessage({ msg }) {
  const isUser = msg.sender === "user";
  const isNeil = msg.sender === "neil";

  return (
    <div style={{
      display: "flex",
      gap: 12,
      flexDirection: isUser ? "row-reverse" : "row",
      animation: "slideIn 0.3s ease",
    }}>
      {/* Avatar */}
      <div style={{
        width: 32, height: 32,
        borderRadius: "50%",
        flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14,
        border: "1px solid rgba(79,195,247,0.2)",
        background: "#0f1729",
        marginTop: 2,
        boxShadow: isNeil ? "0 0 12px rgba(79,195,247,0.2)" : "none",
      }}>
        {isUser ? "👤" : isNeil ? "🚀" : "⚠️"}
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: "min(72%, 520px)",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: isUser ? "flex-end" : "flex-start",
      }}>
        <div style={{
          fontSize: 9,
          letterSpacing: "0.2em",
          color: "#4a6fa5",
          textTransform: "uppercase",
          padding: "0 4px",
        }}>
          {isUser ? "You" : isNeil ? "Neil Armstrong" : "System"}
        </div>

        <div style={{
          padding: "12px 16px",
          borderRadius: 16,
          borderBottomLeftRadius: isUser ? 16 : 4,
          borderBottomRightRadius: isUser ? 4 : 16,
          fontSize: 13,
          lineHeight: 1.65,
          letterSpacing: "0.02em",
          background: isUser
            ? "rgba(79,195,247,0.13)"
            : msg.sender === "system"
            ? "rgba(255,68,68,0.13)"
            : "#0f1729",
          border: isUser
            ? "1px solid rgba(79,195,247,0.33)"
            : msg.sender === "system"
            ? "1px solid rgba(255,68,68,0.27)"
            : "1px solid rgba(79,195,247,0.2)",
          color: msg.sender === "system" ? "#ff8888" : "#e8f4fd",
        }}>
          {msg.text}
        </div>
      </div>
    </div>
  );
}