# 🐦 Twitter Sentiment Analysis

An AI-powered sentiment analysis tool for tweets, built with React and the Anthropic Claude API.

## Features
- **Real-time NLP Analysis** — classify any tweet as Positive / Negative / Neutral
- **Sentiment Score** — polarity score from -1.0 to +1.0
- **Confidence %** — how confident the model is in its prediction
- **Emotion Detection** — maps to Plutchik's emotion wheel
- **Keyword Signals** — highlights what drove the sentiment
- **Batch Demo** — auto-runs 10 sample tweets to show live stats
- **Analysis History** — sidebar keeps track of all past analyses

---

## 🚀 Setup & Run in VS Code

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- An [Anthropic API key](https://console.anthropic.com/)

### Steps

```bash
# 1. Open the project folder in VS Code
cd twitter-sentiment

# 2. Install dependencies
npm install

# 3. Create your .env file
cp .env.example .env
# Then open .env and replace  your_api_key_here  with your actual key

# 4. Start the development server
npm start
```

The app opens automatically at **http://localhost:3000**

---

## 📁 Project Structure

```
twitter-sentiment/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── components/
│   │   ├── ResultCard.jsx      # Sentiment result display
│   │   ├── ScoreBar.jsx        # Polarity score slider
│   │   ├── StatsBar.jsx        # Live +/−/neutral stats
│   │   ├── HistoryItem.jsx     # History sidebar row
│   │   └── NLPPipeline.jsx     # Pipeline steps sidebar
│   ├── api.js                  # Anthropic API helper
│   ├── constants.js            # Sample tweets & config
│   ├── App.jsx                 # Main application
│   └── index.js                # React entry point
├── .env.example                # Environment variable template
├── package.json
└── README.md
```

---

## 🔑 API Key Setup

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Create an account and generate an API key
3. Open `.env` and set:
   ```
   REACT_APP_ANTHROPIC_API_KEY=sk-ant-...
   ```
4. In `src/api.js`, uncomment the `x-api-key` header line:
   ```js
   "x-api-key": process.env.REACT_APP_ANTHROPIC_API_KEY,
   ```

> ⚠️ **Never commit your `.env` file** to version control. It's already in `.gitignore` by default with Create React App.

---

## 🛠 Built With
- React 18
- Anthropic Claude API (claude-sonnet-4)
- Create React App
