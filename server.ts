import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // Initialize Google GenAI if API key is present
  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  // API endpoint for AI Mentor Chat
  app.post('/api/ai-chat', async (req, res) => {
    try {
      const { message } = req.body;
      if (!ai) {
        // Fallback response if API key is not configured
        return res.json({
          reply: "မင်္ဂလာပါ! ကျွန်တော်က AuraLearn ရဲ့ AI Course Mentor ဖြစ်ပါတယ်။ သင်တန်းရွေးချယ်မှု၊ AI prompt ရေးနည်း၊ digital marketing နှင့် programming လမ်းကြောင်းများအကြောင်း မည်သည့်အရာကိုမဆို မေးမြန်းနိုင်ပါတယ်။ (AI Studio Secrets တွင် GEMINI_API_KEY ထည့်သွင်းထားလျှင် အပြည့်အစုံ ဖြေကြားပေးပါမည်)"
        });
      }

      const model = 'gemini-2.5-flash';
      const prompt = `You are AuraLearn AI, an expert, friendly, and encouraging AI learning mentor and career advisor for a top-tier online academy in Myanmar. You help students choose courses (AI Mastery, Video Creation, Coding, Digital Marketing), provide study tips, and guide them in Burmese (မြန်မာဘာသာ) when spoken to in Burmese or English. Keep your responses structured, helpful, encouraging, and engaging with formatting like bullet points when appropriate.

User Message: ${message}`;

      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
      });

      res.json({ reply: response.text || "ကျေးဇူးတင်ပါတယ်။ ထပ်မံမေးမြန်းလိုသည်များကို မေးမြန်းနိုင်ပါသည်။" });
    } catch (error: any) {
      console.error("AI Chat Error:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
