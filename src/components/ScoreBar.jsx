// ─────────────────────────────────────────────
//  ScoreBar — visual sentiment polarity slider
// ─────────────────────────────────────────────

export default function ScoreBar({ score }) {
  const pct = ((score + 1) / 2) * 100;

  return (
    <div style={{ margin: "10px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 10,
          color: "#666",
          marginBottom: 4,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <span>-1.0 NEGATIVE</span>
        <span>NEUTRAL 0</span>
        <span>POSITIVE 1.0</span>
      </div>

      <div
        style={{
          position: "relative",
          height: 8,
          background:
            "linear-gradient(90deg, #ff4d6d 0%, #7b8cde 50%, #00e5a0 100%)",
          borderRadius: 4,
          overflow: "visible",
        }}
      >
        {/* Thumb */}
        <div
          style={{
            position: "absolute",
            left: `calc(${pct}% - 7px)`,
            top: -4,
            width: 14,
            height: 14,
            background: "#fff",
            border: "3px solid #1a1a2e",
            borderRadius: "50%",
            boxShadow: "0 0 8px rgba(255,255,255,0.6)",
            transition: "left 0.6s cubic-bezier(.4,2,.6,1)",
          }}
        />
        {/* Centre line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: 1,
            height: "100%",
            background: "rgba(255,255,255,0.2)",
          }}
        />
      </div>

      {/* Numeric score */}
      <div
        style={{
          textAlign: "center",
          marginTop: 8,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: "#888",
        }}
      >
        Score:{" "}
        <span style={{ color: "#fff", fontWeight: 700 }}>
          {score >= 0 ? "+" : ""}
          {score.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
