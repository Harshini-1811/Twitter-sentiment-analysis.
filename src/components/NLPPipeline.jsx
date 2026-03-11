// ─────────────────────────────────────────────
//  NLPPipeline — sidebar showing pipeline steps
// ─────────────────────────────────────────────
import { NLP_PIPELINE } from "../constants";

export default function NLPPipeline() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: "16px 18px",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          fontSize: 10,
          letterSpacing: 3,
          color: "#666",
          fontFamily: "'JetBrains Mono', monospace",
          marginBottom: 14,
        }}
      >
        NLP PIPELINE
      </div>

      {NLP_PIPELINE.map((p, i) => (
        <div
          key={p.step}
          style={{
            display: "flex",
            gap: 10,
            marginBottom: i < NLP_PIPELINE.length - 1 ? 12 : 0,
            position: "relative",
          }}
        >
          {/* Connector line */}
          {i < NLP_PIPELINE.length - 1 && (
            <div
              style={{
                position: "absolute",
                left: 14,
                top: 26,
                width: 1,
                height: 20,
                background: "rgba(255,255,255,0.08)",
              }}
            />
          )}

          {/* Step badge */}
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: `${p.color}22`,
              border: `1px solid ${p.color}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
              color: p.color,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {p.step}
          </div>

          {/* Step details */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#ddd" }}>
              {p.label}
            </div>
            <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>
              {p.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
