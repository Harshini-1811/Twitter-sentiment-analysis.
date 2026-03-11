// ─────────────────────────────────────────────
//  Constants & Configuration
// ─────────────────────────────────────────────

export const SAMPLE_TWEETS = [
  "Just had the most amazing coffee this morning! ☕ Absolutely loving life right now! #blessed #happy",
  "The new software update completely broke everything. I've lost 3 hours of work. Absolutely furious! 😡",
  "The weather today is cloudy with a chance of rain. Typical Tuesday afternoon.",
  "OMG I can't believe how incredible this concert was!! Best night of my life!! 🎉🎊",
  "Traffic is terrible again. Same story every single day. Why do I even bother? 😤",
  "Just watched a documentary about space. Pretty informative. Learned some new things.",
  "Feeling so grateful for my amazing friends and family. You all make life worth living 💕",
  "This product is a complete scam. Waste of money. Never buying from them again. 0/10.",
  "Meeting got rescheduled to 3pm. Noted.",
  "Sunrise this morning was absolutely breathtaking 🌅 Nature never fails to amaze me!",
];

export const SENTIMENT_CONFIG = {
  positive: {
    color: "#00e5a0",
    bg: "rgba(0,229,160,0.08)",
    border: "rgba(0,229,160,0.3)",
    glow: "0 0 20px rgba(0,229,160,0.2)",
    icon: "▲",
    label: "POSITIVE",
  },
  negative: {
    color: "#ff4d6d",
    bg: "rgba(255,77,109,0.08)",
    border: "rgba(255,77,109,0.3)",
    glow: "0 0 20px rgba(255,77,109,0.2)",
    icon: "▼",
    label: "NEGATIVE",
  },
  neutral: {
    color: "#7b8cde",
    bg: "rgba(123,140,222,0.08)",
    border: "rgba(123,140,222,0.3)",
    glow: "0 0 20px rgba(123,140,222,0.2)",
    icon: "●",
    label: "NEUTRAL",
  },
};

export const EMOTION_COLORS = {
  joy: "#FFD700",
  anger: "#FF4D6D",
  surprise: "#FF9F43",
  sadness: "#7B8CDE",
  fear: "#9B59B6",
  disgust: "#2ECC71",
  anticipation: "#F39C12",
  trust: "#00E5A0",
};

export const NLP_PIPELINE = [
  {
    step: "01",
    label: "Text Preprocessing",
    desc: "Tokenization, stopword removal, normalization",
    color: "#7b8cde",
  },
  {
    step: "02",
    label: "Feature Extraction",
    desc: "TF-IDF, n-grams, emoji handling",
    color: "#00e5a0",
  },
  {
    step: "03",
    label: "Sentiment Scoring",
    desc: "Multi-class classification model",
    color: "#ff9f43",
  },
  {
    step: "04",
    label: "Emotion Detection",
    desc: "Plutchik wheel emotion mapping",
    color: "#ff4d6d",
  },
];
