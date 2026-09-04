import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { orchestrator } from './server/orchestrator';
import { ragPipeline } from './server/rag';
import { knowledgeGraph } from './server/knowledge-graph';
import { HISTORICAL_DESTINATIONS, HISTORICAL_DOCS } from './server/knowledge-base';
import { HistoricalKnowledgeDoc } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API ROUTE: Health check
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      service: 'CHRONO Historical AI Engine',
      docsIndexed: HISTORICAL_DOCS.length,
      graphEntities: knowledgeGraph.getAllNodes().length
    });
  });

  // API ROUTE: Historical Destinations & Timeline Eras
  app.get('/api/destinations', (req, res) => {
    res.json(HISTORICAL_DESTINATIONS);
  });

  app.get('/api/destinations/:id', (req, res) => {
    const dest = HISTORICAL_DESTINATIONS.find(d => d.id === req.params.id);
    if (!dest) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.json(dest);
  });

  // API ROUTE: Knowledge Graph
  app.get('/api/graph', (req, res) => {
    const { location, q } = req.query;
    if (q || location) {
      const result = knowledgeGraph.findRelatedEntities(
        (q as string) || '', 
        (location as string) || undefined
      );
      return res.json(result);
    }
    res.json({
      nodes: knowledgeGraph.getAllNodes(),
      edges: knowledgeGraph.getAllEdges()
    });
  });

  // API ROUTE: Knowledge Base Documents & Ingestion
  app.get('/api/sources', (req, res) => {
    res.json(HISTORICAL_DOCS);
  });

  app.post('/api/sources/ingest', (req, res) => {
    try {
      const { title, location, country, yearStart, yearEnd, period, topic, source, sourceType, content } = req.body;
      if (!title || !content || !location) {
        return res.status(400).json({ error: 'Title, location, and content are required.' });
      }

      const newDoc: HistoricalKnowledgeDoc = {
        id: `custom-${Date.now()}`,
        title,
        location,
        country: country || 'Unspecified',
        yearStart: Number(yearStart) || 1500,
        yearEnd: Number(yearEnd) || 1550,
        period: period || 'Historical Era',
        topic: topic || 'General History',
        source: source || 'User Ingestion',
        sourceType: sourceType || 'Academic',
        reliability: 'high',
        content,
        entities: [location]
      };

      ragPipeline.addCustomDocument(newDoc);
      res.json({ success: true, document: newDoc });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to ingest document' });
    }
  });

  // API ROUTE: Streaming Chat with Agent Activity (Server-Sent Events)
  app.post('/api/chat/stream', async (req, res) => {
    const { message, history = [], currentContext, characterPersona } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message string is required' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    try {
      const result = await orchestrator.executePipeline(
        {
          message,
          history,
          currentContext,
          characterPersona
        },
        // Callback for agent activity updates
        (step) => {
          res.write(`event: activity\ndata: ${JSON.stringify(step)}\n\n`);
        },
        // Callback for text stream chunks
        (token) => {
          res.write(`event: token\ndata: ${JSON.stringify({ token })}\n\n`);
        }
      );

      // Send final completion payload with citations, timeContext, and metadata
      res.write(`event: done\ndata: ${JSON.stringify(result)}\n\n`);
      res.end();
    } catch (error: any) {
      console.error('Streaming pipeline error:', error);
      res.write(`event: error\ndata: ${JSON.stringify({ error: error.message || 'Internal pipeline error' })}\n\n`);
      res.end();
    }
  });

  // API ROUTE: Standard non-streaming chat
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history = [], currentContext, characterPersona } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message string is required' });
      }

      const result = await orchestrator.executePipeline({
        message,
        history,
        currentContext,
        characterPersona
      });

      res.json(result);
    } catch (err: any) {
      console.error('Chat error:', err);
      res.status(500).json({ error: err.message || 'Error processing historical inquiry' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CHRONO server active on port ${PORT} [0.0.0.0:${PORT}]`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
