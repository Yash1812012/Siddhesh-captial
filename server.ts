import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI
const ai = new GoogleGenAI();

// 1. Search Grounding API
app.post('/api/search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: query,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
    } catch (e1) {
      console.warn('Search tool fallback:', e1);
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: query,
      });
    }

    const text = response.text || '';
    const groundingChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const searchQueries =
      response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];

    const sources = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title || chunk.web.uri,
        url: chunk.web.uri,
      }));

    return res.json({
      text,
      sources,
      searchQueries,
    });
  } catch (error: any) {
    console.error('Search grounding error:', error);
    return res.status(500).json({ error: error.message || 'Search failed' });
  }
});

// 2. Maps Grounding API
app.post('/api/maps', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: query,
        config: {
          tools: [{ googleMaps: {} }],
        },
      });
    } catch (e1) {
      console.warn('Maps tool fallback:', e1);
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an institutional intelligence specialist for Siddhesh Capital Market Services Private Limited at 122, Maker Chambers III, Nariman Point, Mumbai 400021. Provide precise geographic and institutional details for: ${query}`,
      });
    }

    const text = response.text || '';
    const groundingChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const sources = groundingChunks
      .filter((chunk: any) => chunk.web || chunk.maps)
      .map((chunk: any) => ({
        title: chunk.web?.title || chunk.maps?.title || 'Google Maps Location',
        url:
          chunk.web?.uri ||
          chunk.maps?.uri ||
          'https://maps.google.com/?q=122+Maker+Chambers+III+Nariman+Point+Mumbai',
      }));

    return res.json({
      text,
      sources,
    });
  } catch (error: any) {
    console.error('Maps grounding error:', error);
    return res.status(500).json({ error: error.message || 'Maps query failed' });
  }
});

// Mount Vite or serve static dist
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
