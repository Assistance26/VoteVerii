# 🗳️ VoteVeri – Transparent Campus Election System with AI Moderation & Blockchain Voting

> **"Fair Elections. Ethical Campaigns. Verified Votes."**

**VoteVeri** is a decentralized campus election system powered by **MERN**, **Web3.js**, **Truffle**, and **Generative AI (Ollama with Mistral)**. It ensures transparent, tamper-proof voting and AI-assisted ethical campaigning.

---

## 🚀 Core Features

- **AI Campaign Moderation** – Detects hate speech, misinformation, and AI-generated manipulation.
- **Smart Chatbot** – Students ask questions about candidates and get unbiased answers.
- **Blockchain Voting** – On-chain secure voting via MetaMask & smart contracts.
- **AI Summary Reports** – Auto-generated post-election reports & visual dashboards.
- **Role System** – Admins manage elections, candidates upload content, voters vote & chat.

---

## 🛠️ Tech Stack

| Layer         | Technology                                      |
|---------------|--------------------------------------------------|
| Frontend      | React.js, Tailwind CSS                           |
| Backend       | Node.js, Express.js (MERN)                       |
| Web3          | Web3.js, MetaMask                                |
| Blockchain    | Solidity, Truffle, Ganache                       |
| AI/LLMs       | Ollama (Mistral), LangChain.js, ChromaDB         |
| Toxicity Check| TensorFlow.js (@tensorflow-models/toxicity)     |
| Database      | MongoDB (Mongoose), ChromaDB (Vector Store)     |
| Reports       | Chart.js, Recharts, Puppeteer/React-PDF         |
| Auth          | Firebase Auth or JWT                             |

---

## Clone Guide
```
git init 
git clone https://github.com/Assistance26/VoteVerii 
cd voteveri
```

## Backend (Express + MongoDb + LLM Models logic)
```
cd Backend
npm install
node server.js
```
## Frontend (React App)
```
  cd Frontend
  npm install
  npm run dev
```
## Ollama LLM Setup
```
ollama pull mistral
ollama run mistral
```
## Blockchain
```
  truffle develop
  migrate-- reset
```
## Note: Create your firebaseServiceAccountKey.json file in the Backend/config