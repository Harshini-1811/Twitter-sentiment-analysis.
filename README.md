This project is an AI-powered Twitter Sentiment Analysis web application that analyzes the sentiment of tweets using Natural Language Processing techniques. The application classifies tweets into Positive, Negative, or Neutral sentiments and provides additional insights such as sentiment polarity score, confidence level, and emotion detection.
The application is built using React for the frontend and integrates the Claude API to perform sentiment analysis.

📌 Project Overview
The goal of this project is to demonstrate how modern NLP APIs can be integrated into a web application to analyze user-generated text in real time. The system allows users to input tweets and instantly receive sentiment predictions along with useful analytical insights.

Features:
Real-time Sentiment Analysis:
Analyzes tweets instantly and classifies them as Positive, Negative, or Neutral.
Sentiment Polarity Score:
Generates a sentiment score ranging from -1.0 to +1.0 indicating the intensity of the sentiment.
Confidence Percentage:
Displays the confidence level of the prediction made by the model.
Emotion Detection:
Maps emotions based on Plutchik's Emotion Wheel to identify emotional tone in tweets.
Keyword Signal Detection:
Highlights important words that influenced the sentiment classification.
Batch Tweet Demonstration:
Automatically analyzes 10 sample tweets to demonstrate real-time statistics.
Analysis History Panel:
Maintains a history of previously analyzed tweets for easy reference.

Technologies Used:
Frontend: React
Programming Language: JavaScript
API Integration: Claude API
Runtime Environment: Node.js
Development Environment: Visual Studio Code

Running the Project in VS Code
Prerequisites
Before running the project, make sure you have installed:
Node.js (version 16 or higher)

An API key from Anthropic
Installation Steps:
1. Clone the repository
git clone https://github.com/Harshini-1811/Twitter-Sentiment-Analysis.git

2. Open the project folder
cd Twitter-Sentiment-Analysis

Open the folder in Visual Studio Code.

3. Install project dependencies
npm install

4. Configure environment variables

Create a .env file from the example file:

cp .env.example .env

Then open the .env file and add your API key:

REACT_APP_ANTHROPIC_API_KEY=your_api_key_here

5. Run the development server
npm start

The application will run locally at:

http://localhost:3000

Project Structure:
Twitter-Sentiment-Analysis
│
├── public
│   └── index.html
│
├── src
│   ├── components
│   │   ├── ResultCard.jsx
│   │   ├── ScoreBar.jsx
│   │   ├── StatsBar.jsx
│   │   ├── HistoryItem.jsx
│   │   └── NLPPipeline.jsx
│   │
│   ├── api.js
│   ├── constants.js
│   ├── App.jsx
│   └── index.js
│
├── .env.example
├── package.json
└── README.md

API Configuration:
To enable sentiment analysis using the Claude model:
Create an API key from Anthropic.
Add the key inside the .env file.

Example:

REACT_APP_ANTHROPIC_API_KEY=sk-ant-xxxxxxxx
Ensure the API header is enabled inside src/api.js:

"x-api-key": process.env.REACT_APP_ANTHROPIC_API_KEY

 Security Note:

The .env file is excluded from version control using .gitignore to ensure that API keys remain private and secure.

Future Improvements:

Some potential improvements for this project include:
Adding tweet visualization dashboards
Integrating real-time Twitter API streaming
Deploying the application using cloud hosting services
Adding more advanced NLP models

Author:
Harshini Yaddlapalli
B.Tech – Artificial Intelligence & Machine Learning


