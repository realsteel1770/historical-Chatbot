export function Sidebar({ onReadLast, onDownload, onToggleTheme, theme, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        style={{
          display: isOpen ? "block" : "none",
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 99,
        }}
      />

      <aside style={{
        width: 260,
        flexShrink: 0,
        background: theme.surface,
        borderRight: `1px solid ${theme.accent}22`,
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
        gap: 8,
        position: "fixed",
        top: 0, left: 0, bottom: 0,
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        zIndex: 100,
      }}>
        <div style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.3em",
          color: theme.accent,
          textTransform: "uppercase",
          padding: "8px 0 16px",
          borderBottom: `1px solid ${theme.accent}33`,
          marginBottom: 8,
        }}>
          Mission Nav
        </div>

        <SidebarBtn onClick={() => { window.location.reload(); onClose(); }}>
          🔄 New Transmission
        </SidebarBtn>

        <SidebarBtn onClick={onReadLast}>
          🔊 Read Last Message
        </SidebarBtn>

        <SidebarBtn onClick={onDownload}>
          ⬇️ Download Log
        </SidebarBtn>

        <SidebarBtn onClick={() => { onToggleTheme(); onClose(); }}>
          🎨 Toggle Theme
        </SidebarBtn>

        <div style={{
          marginTop: "auto",
          padding: "10px 14px",
          borderRadius: 8,
          border: `1px solid ${theme.accent}33`,
          background: `${theme.accent}08`,
        }}>
          <div style={{ fontSize: 9, letterSpacing: "0.2em", color: theme.dim, textTransform: "uppercase", marginBottom: 4 }}>
            Active Theme
          </div>
          <div style={{ fontSize: 11, color: theme.accent, fontFamily: "'Orbitron', monospace" }}>
            {theme.name}
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        borderRadius: 8,
        border: "1px solid transparent",
        background: "transparent",
        color: "#4a6fa5",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
        letterSpacing: "0.05em",
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        transition: "all 0.2s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "rgba(79,195,247,0.08)";
        e.currentTarget.style.color = "#e8f4fd";
        e.currentTarget.style.borderColor = "rgba(79,195,247,0.27)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "#4a6fa5";
        e.currentTarget.style.borderColor = "transparent";
      }}
    >
      {children}
    </button>
  );
}