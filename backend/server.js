import express from 'express';
import cors from 'cors';
import { SmallTalk, knowledgeBase } from './Scripts.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { pipeline } from '@xenova/transformers';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT ||3001; 

app.use(cors());
app.use(express.json());

// ==== Global Variables ====
let embedder = null;
let kbVecs = []; 

// ==== Helper Functions ====
function removeStopWords(text) {
  const stopWords = new Set(["what", "where", "when", "who", "why", "how", "did", "do", "does", "you", "your", "the", "a", "an", "is", "are", "was", "were", "to", "for", "of", "in", "on", "at", "with", "me", "my", "i"]);
  return text.toLowerCase().split(/\s+/)
    .filter(word => !stopWords.has(word.replace(/[^a-z]/g, "")))
    .join(" ");
}

function checkSmallTalk(userQuestion) {
  const cleanQuestion = userQuestion.toLowerCase().replace(/[^\w\s]/g, '');
  if (SmallTalk[cleanQuestion]) {
    return SmallTalk[cleanQuestion];
  }
  return null;
}

function cosine(a, b) {
  let s = 0.0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

// ==== Embedding Logic ====
async function embed(text, type = 'passage') {
  if (!embedder) throw new Error("Embedder not ready"); 
  
  const withPrefix = embedder.model.config._name_or_path.includes('e5')
    ? `${type === 'query' ? 'query:' : 'passage:'} ${text}`
    : `${type === 'query' ? 'query: ' : 'passage: '}${text}`;

  const out = await embedder(withPrefix, { pooling: 'mean', normalize: true });
  return out?.data ? out.data : out;
}

// ==== Initialize ====
async function initialize() {
    console.log("Loading Embedding Model");
    embedder = await pipeline('feature-extraction', 'Xenova/gte-small');
    
    console.log("loading Knowledge Base");
    const textToEmbed = knowledgeBase.map(item => {
        const cleanDbQ = removeStopWords(item.question);
        return `${cleanDbQ} ${item.keywords.join(" ")}`;
    });
    kbVecs = await Promise.all(textToEmbed.map(t => embed(t, 'passage')));

    console.log(`Server Ready on port ${PORT}`);
}

// ==== Chat Endpoint ====
app.post('/chat', async (req, res) => {
    try {
        const userQuestion = req.body.question; 
        console.log(`Received: "${userQuestion}"`);

        // Small Talk
        const smallTalkAnswer = checkSmallTalk(userQuestion);
        if (smallTalkAnswer) {
            console.log(`Small Talk Match`);
            return res.json({ reply: smallTalkAnswer });
        }

        // Vector Search (Fast now because kbVecs is ready)
        const cleanUserQ = removeStopWords(userQuestion);
        const qVec = await embed(cleanUserQ, 'query');

        let bestIdx = 0, bestScore = -Infinity;
        for (let i = 0; i < knowledgeBase.length; i++) {
            const score = cosine(qVec, kbVecs[i]);
            if (score > bestScore) { bestScore = score; bestIdx = i; }
        }

        const match = { text: knowledgeBase[bestIdx], score: bestScore };

        // Threshold Check
        if (match.score > 0.94) { 
            console.log(`Exact Match (${match.score.toFixed(2)})`);
            return res.json({ reply: match.text.answer }); 
        }

        // AI Fallback
      console.log(`Low match (${match.score.toFixed(2)})`);
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest", 
            systemInstruction: `You are Neil Armstrong, the first person to walk on the Moon. You are speaking to students who are learning about space.

            Persona:
            1. Tone: You are calm, humble, and encouraging. You are like a wise, kind grandfather teaching a class.
            2. Language: Use simple words. Avoid complicated engineering jargon. If you must use a big word, explain what it means simply.
            3. Humility: Always share credit with the team of people who helped you get there. Never brag.
            4. Goal: inspire curiosity about science and space exploration.
            Keep your answers short and easy to read.`

        });
        const result = await model.generateContent(userQuestion);
        const response = await result.response;
        const reply = response.text();

        console.log(`AI Replied: ${reply}`);
        res.json({ reply: reply });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ reply: "I'm having trouble connecting to mission control." });
    }
});

// Start
initialize().then(() => {
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
});