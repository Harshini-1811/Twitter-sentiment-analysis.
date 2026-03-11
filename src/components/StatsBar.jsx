// ─────────────────────────────────────────────
//  StatsBar — live positive/negative/neutral %
// ─────────────────────────────────────────────
import { SENTIMENT_CONFIG } from "../constants";

export default function StatsBar({ stats }) {
  if (stats.total === 0) return null;

  const pct = (n) =>
    stats.total > 0 ? Math.round((n / stats.total) * 100) : 0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 10,
        marginBottom: 20,
        animation: "fadeUp 0.4s ease forwards",
      }}
    >
      {["positive", "negative", "neutral"].map((s) => {
        const cfg = SENTIMENT_CONFIG[s];
        return (
          <div
            key={s}
            style={{
              background: cfg.bg,
              border: `1px solid ${cfg.border}`,
              borderRadius: 12,
              padding: "12px 16px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 900, color: cfg.color }}>
              {pct(stats[s])}%
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#666",
                letterSpacing: 2,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {s.toUpperCase()} · {stats[s]}
            </div>
            <div
              style={{
                marginTop: 6,
                height: 3,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 2,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${pct(stats[s])}%`,
                  background: cfg.color,
                  borderRadius: 2,
                  transition: "width 0.5s",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
