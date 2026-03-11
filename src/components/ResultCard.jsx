// ─────────────────────────────────────────────
//  ResultCard — displays analysis output
// ─────────────────────────────────────────────
import { useState, useEffect } from "react";
import ScoreBar from "./ScoreBar";
import { SENTIMENT_CONFIG, EMOTION_COLORS } from "../constants";

export default function ResultCard({ result }) {
  const cfg = SENTIMENT_CONFIG[result.sentiment];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.5s cubic-bezier(.4,0,.2,1)",
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: 16,
        padding: "20px 24px",
        boxShadow: cfg.glow,
        marginTop: 20,
      }}
    >
      {/* ── Header ── */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: cfg.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: 900,
            color: "#0a0a14",
            flexShrink: 0,
          }}
        >
          {cfg.icon}
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 11,
              color: "#666",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: 2,
            }}
          >
            SENTIMENT DETECTED
          </div>
          <div
            style={{ fontSize: 22, fontWeight: 800, color: cfg.color, letterSpacing: 1 }}
          >
            {cfg.label}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 11,
              color: "#666",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            CONFIDENCE
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>
            {result.confidence}%
          </div>
        </div>
      </div>

      {/* ── Score bar ── */}
      <ScoreBar score={result.score} />

      {/* ── Summary ── */}
      <p style={{ color: "#ccc", fontSize: 13, margin: "14px 0 10px", lineHeight: 1.6 }}>
        {result.summary}
      </p>

      {/* ── Emotions ── */}
      {result.emotions?.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div
            style={{
              fontSize: 10,
              color: "#666",
              letterSpacing: 2,
              marginBottom: 6,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            EMOTIONS
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {result.emotions.map((e) => (
              <span
                key={e}
                style={{
                  background: EMOTION_COLORS[e]
                    ? `${EMOTION_COLORS[e]}22`
                    : "rgba(255,255,255,0.08)",
                  color: EMOTION_COLORS[e] || "#aaa",
                  border: `1px solid ${
                    EMOTION_COLORS[e] ? EMOTION_COLORS[e] + "44" : "#333"
                  }`,
                  borderRadius: 20,
                  padding: "3px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Keywords ── */}
      {result.keywords?.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div
            style={{
              fontSize: 10,
              color: "#666",
              letterSpacing: 2,
              marginBottom: 6,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            KEY SIGNALS
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {result.keywords.map((k) => (
              <span
                key={k}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "#999",
                  border: "1px solid #333",
                  borderRadius: 6,
                  padding: "3px 10px",
                  fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                #{k}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
