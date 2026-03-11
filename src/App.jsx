// ─────────────────────────────────────────────
//  Twitter Sentiment Analysis — Main App
// ─────────────────────────────────────────────
import { useState, useRef } from "react";
import { analyzeTweet } from "./api";
import { SAMPLE_TWEETS } from "./constants";

import StatsBar    from "./components/StatsBar";
import ResultCard  from "./components/ResultCard";
import HistoryItem from "./components/HistoryItem";
import NLPPipeline from "./components/NLPPipeline";

// ── global styles ──────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; background: #0a0a14; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
  textarea:focus { outline: none; }
  @keyframes spin    { to { transform: rotate(360deg); } }
  @keyframes fadeUp  { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
`;

export default function App() {
  const [tweet,         setTweet]         = useState("");
  const [result,        setResult]        = useState(null);
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState(null);
  const [history,       setHistory]       = useState([]);
  const [stats,         setStats]         = useState({ positive: 0, negative: 0, neutral: 0, total: 0 });
  const [batchMode,     setBatchMode]     = useState(false);
  const [batchProgress, setBatchProgress] = useState(null);
  const textareaRef = useRef();

  // ── single analysis ──────────────────────────
  const analyze = async (text) => {
    const t = (text || tweet).trim();
    if (!t) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await analyzeTweet(t);
      setResult(res);
      setHistory((h) => [{ tweet: t, result: res, id: Date.now() }, ...h.slice(0, 19)]);
      setStats((s) => ({ ...s, [res.sentiment]: s[res.sentiment] + 1, total: s.total + 1 }));
    } catch (e) {
      setError(e.message || "Analysis failed. Please check your API key / connection.");
    } finally {
      setLoading(false);
    }
  };

  // ── batch demo ───────────────────────────────
  const runBatchAnalysis = async () => {
    setBatchMode(true);
    setBatchProgress({ current: 0, total: SAMPLE_TWEETS.length });
    setHistory([]);
    setStats({ positive: 0, negative: 0, neutral: 0, total: 0 });

    const newStats   = { positive: 0, negative: 0, neutral: 0, total: 0 };
    const newHistory = [];

    for (let i = 0; i < SAMPLE_TWEETS.length; i++) {
      setBatchProgress({ current: i + 1, total: SAMPLE_TWEETS.length });
      try {
        const res = await analyzeTweet(SAMPLE_TWEETS[i]);
        newHistory.unshift({ tweet: SAMPLE_TWEETS[i], result: res, id: Date.now() + i });
        newStats[res.sentiment]++;
        newStats.total++;
        setHistory([...newHistory]);
        setStats({ ...newStats });
        setTweet(SAMPLE_TWEETS[i]);
        setResult(res);
      } catch (e) {
        console.error("Batch error:", e);
      }
      await new Promise((r) => setTimeout(r, 300));
    }

    setBatchMode(false);
    setBatchProgress(null);
  };

  // ── render ───────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a14",
        fontFamily: "'Syne', sans-serif",
        color: "#fff",
        paddingBottom: 60,
      }}
    >
      <style>{globalStyles}</style>

      {/* ── Header ── */}
      <div
        style={{
          background: "linear-gradient(180deg, #12122a 0%, transparent 100%)",
          padding: "40px 0 30px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          marginBottom: 32,
          animation: "fadeUp 0.6s ease forwards",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 5,
            color: "#7b8cde",
            fontFamily: "'JetBrains Mono', monospace",
            marginBottom: 10,
          }}
        >
          NLP · MACHINE LEARNING · SOCIAL ANALYTICS
        </div>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 800,
            margin: 0,
            background: "linear-gradient(135deg, #fff 0%, #7b8cde 50%, #00e5a0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -1,
          }}
        >
          Twitter Sentiment Analysis
        </h1>
        <p style={{ color: "#666", marginTop: 8, fontSize: 14 }}>
          AI-powered NLP · Real-time classification · Emotion detection
        </p>
      </div>

      {/* ── Body ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: 24,
          }}
        >
          {/* ── Left: main panel ── */}
          <div>
            <StatsBar stats={stats} />

            {/* Input card */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {/* Card header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #1d9bf0, #7b8cde)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  𝕏
                </div>
                <div style={{ fontSize: 13, color: "#666" }}>
                  Enter a tweet to analyze...
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    fontSize: 11,
                    color: "#444",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {tweet.length}/280
                </div>
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={tweet}
                onChange={(e) => setTweet(e.target.value.slice(0, 280))}
                placeholder="Paste any tweet or write your own text here..."
                style={{
                  width: "100%",
                  minHeight: 120,
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: 15,
                  padding: "16px",
                  resize: "none",
                  fontFamily: "'Syne', sans-serif",
                  lineHeight: 1.7,
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.ctrlKey) analyze();
                }}
              />

              {/* Action buttons */}
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "12px 16px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <button
                  onClick={() => analyze()}
                  disabled={loading || !tweet.trim()}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: 10,
                    border: "none",
                    background:
                      loading || !tweet.trim()
                        ? "rgba(255,255,255,0.06)"
                        : "linear-gradient(135deg, #7b8cde, #00e5a0)",
                    color: loading || !tweet.trim() ? "#444" : "#0a0a14",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: loading || !tweet.trim() ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    letterSpacing: 1,
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  {loading ? (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          border: "2px solid #666",
                          borderTopColor: "#fff",
                          borderRadius: "50%",
                          display: "inline-block",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                      ANALYZING...
                    </span>
                  ) : (
                    "ANALYZE SENTIMENT  (Ctrl+Enter)"
                  )}
                </button>

                <button
                  onClick={() => {
                    const r =
                      SAMPLE_TWEETS[Math.floor(Math.random() * SAMPLE_TWEETS.length)];
                    setTweet(r);
                    setResult(null);
                  }}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: "#aaa",
                    fontSize: 12,
                    cursor: "pointer",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  RANDOM
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  marginTop: 12,
                  padding: "12px 16px",
                  background: "rgba(255,77,109,0.1)",
                  border: "1px solid rgba(255,77,109,0.3)",
                  borderRadius: 10,
                  color: "#ff4d6d",
                  fontSize: 13,
                }}
              >
                ⚠ {error}
              </div>
            )}

            {/* Result */}
            {result && !loading && <ResultCard result={result} />}

            {/* Batch button */}
            <div style={{ marginTop: 20 }}>
              <button
                onClick={runBatchAnalysis}
                disabled={batchMode}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px dashed rgba(123,140,222,0.4)",
                  background: "rgba(123,140,222,0.05)",
                  color: batchMode ? "#555" : "#7b8cde",
                  fontSize: 13,
                  cursor: batchMode ? "not-allowed" : "pointer",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: 1,
                  transition: "all 0.2s",
                }}
              >
                {batchMode && batchProgress
                  ? `▶ BATCH PROCESSING... ${batchProgress.current}/${batchProgress.total}`
                  : "▶ RUN BATCH DEMO (10 SAMPLE TWEETS)"}
              </button>

              {batchMode && batchProgress && (
                <div
                  style={{
                    marginTop: 8,
                    height: 3,
                    background: "#1a1a2e",
                    borderRadius: 2,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(batchProgress.current / batchProgress.total) * 100}%`,
                      background: "linear-gradient(90deg, #7b8cde, #00e5a0)",
                      borderRadius: 2,
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* ── Right: sidebar ── */}
          <div>
            <NLPPipeline />

            {/* History */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: "16px 18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: 3,
                    color: "#666",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  ANALYSIS HISTORY
                </div>
                {history.length > 0 && (
                  <div
                    style={{
                      fontSize: 10,
                      color: "#444",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {history.length} analyzed
                  </div>
                )}
              </div>

              {history.length === 0 ? (
                <div
                  style={{
                    color: "#444",
                    fontSize: 12,
                    textAlign: "center",
                    padding: "20px 0",
                  }}
                >
                  No analyses yet
                </div>
              ) : (
                <div style={{ maxHeight: 340, overflowY: "auto" }}>
                  {history.map((item) => (
                    <HistoryItem
                      key={item.id}
                      item={item}
                      onClick={() => {
                        setTweet(item.tweet);
                        setResult(item.result);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
