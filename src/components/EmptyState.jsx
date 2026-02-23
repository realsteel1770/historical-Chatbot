import { SUGGESTED } from "../data/chatData";

export function EmptyState({ onSuggest }) {
  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      textAlign: "center",
      padding: "40px 16px",
      animation: "fadeIn 0.6s ease",
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      `}</style>

      {/* Moon icon */}
      <div style={{
        fontSize: 56,
        filter: "drop-shadow(0 0 24px rgba(79,195,247,0.4))",
        animation: "float 4s ease-in-out infinite",
      }}>
        🌕
      </div>

      <div style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: 16,
        letterSpacing: "0.15em",
        color: "#e8f4fd",
      }}>
        Ask Neil Anything
      </div>

      <p style={{
        fontSize: 11,
        color: "#4a6fa5",
        lineHeight: 1.7,
        maxWidth: 320,
        letterSpacing: "0.05em",
      }}>
        Direct transmission to Neil Armstrong.<br />
        Ask about the Moon landing, space exploration, or life as an astronaut.
      </p>

      {/* Suggestion chips */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: "center",
        maxWidth: 480,
      }}>
        {SUGGESTED.map(q => (
          <button
            key={q}
            onClick={() => onSuggest(q)}
            style={{
              padding: "7px 14px",
              borderRadius: 20,
              border: "1px solid rgba(79,195,247,0.27)",
              background: "rgba(79,195,247,0.06)",
              color: "#4a6fa5",
              fontSize: 10,
              fontFamily: "'IBM Plex Mono', monospace",
              cursor: "pointer",
              letterSpacing: "0.03em",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(79,195,247,0.15)";
              e.currentTarget.style.borderColor = "rgba(79,195,247,0.55)";
              e.currentTarget.style.color = "#e8f4fd";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(79,195,247,0.06)";
              e.currentTarget.style.borderColor = "rgba(79,195,247,0.27)";
              e.currentTarget.style.color = "#4a6fa5";
              e.currentTarget.style.transform = "none";
            }}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}