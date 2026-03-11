// ─────────────────────────────────────────────
//  HistoryItem — single row in history sidebar
// ─────────────────────────────────────────────
import { SENTIMENT_CONFIG } from "../constants";

export default function HistoryItem({ item, onClick }) {
  const cfg = SENTIMENT_CONFIG[item.result.sentiment];

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        borderRadius: 10,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        cursor: "pointer",
        transition: "background 0.2s",
        marginBottom: 6,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.03)")
      }
    >
      {/* Colour dot */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: cfg.color,
          flexShrink: 0,
        }}
      />

      {/* Tweet text */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <div
          style={{
            fontSize: 12,
            color: "#ccc",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.tweet}
        </div>
      </div>

      {/* Confidence */}
      <div
        style={{
          fontSize: 10,
          color: cfg.color,
          fontWeight: 700,
          flexShrink: 0,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {item.result.confidence}%
      </div>
    </div>
  );
}
