export function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: 12, flexDirection: "row" }}>
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
        boxShadow: "0 0 12px rgba(79,195,247,0.2)",
      }}>
        🚀
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{
          fontSize: 9,
          letterSpacing: "0.2em",
          color: "#4a6fa5",
          textTransform: "uppercase",
          padding: "0 4px",
        }}>
          Neil Armstrong
        </div>

        {/* Dots */}
        <div style={{
          display: "flex",
          gap: 5,
          alignItems: "center",
          padding: "14px 20px",
          borderRadius: 16,
          borderBottomLeftRadius: 4,
          background: "#0f1729",
          border: "1px solid rgba(79,195,247,0.2)",
        }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 6, height: 6,
              borderRadius: "50%",
              background: "#4fc3f7",
              animation: `typing 1.2s infinite ${i * 0.2}s`,
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes typing {
          0%, 60%, 100% { opacity: 0.3; transform: scale(1); }
          30% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}