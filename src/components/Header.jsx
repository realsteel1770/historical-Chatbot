export function Header({ onOpenSidebar }) {
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "16px 24px",
      borderBottom: "1px solid rgba(79,195,247,0.13)",
      background: "rgba(15,23,41,0.8)",
      backdropFilter: "blur(12px)",
      flexShrink: 0,
    }}>
      {/* Hamburger - mobile only */}
      <button
        onClick={onOpenSidebar}
        aria-label="Open menu"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 4,
          flexShrink: 0,
        }}
      >
        {[0,1,2].map(i => (
          <span key={i} style={{ display: "block", width: 18, height: 2, background: "#4a6fa5", borderRadius: 2 }} />
        ))}
      </button>

      <div style={{
        width: 40, height: 40,
        borderRadius: "50%",
        border: "2px solid rgba(79,195,247,0.4)",
        background: "rgba(79,195,247,0.1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18,
        boxShadow: "0 0 16px rgba(79,195,247,0.2)",
      }}>
        🚀
      </div>

      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.1em",
        }}>
          Neil Armstrong
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <div style={{
            width: 6, height: 6,
            borderRadius: "50%",
            background: "#4caf50",
            boxShadow: "0 0 6px #4caf5088",
            animation: "pulse 2s infinite",
          }} />
          <span style={{ fontSize: 10, color: "#4a6fa5", letterSpacing: "0.1em" }}>
            Online · Astronaut · Apollo 11
          </span>
        </div>
      </div>

      <div style={{
        fontSize: 9,
        letterSpacing: "0.15em",
        color: "#4fc3f7",
        border: "1px solid rgba(79,195,247,0.27)",
        padding: "3px 8px",
        borderRadius: 20,
        background: "rgba(79,195,247,0.06)",
        textTransform: "uppercase",
      }}>
        Authenticated
      </div>
    </header>
  );
}