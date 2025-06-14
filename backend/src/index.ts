import express from 'express';
import dotenv from 'dotenv';
import { fetchDOM } from './utils/puppetier';
import { parseDOMContent } from './utils/readability';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

console.log("Env value :", process.env.PORT);
console.log("Headless value :", process.env.HEADLESS);

app.post('/get-dom', async (req, res) => {
  try {
    const htmlString = await fetchDOM(req.body.url);
    const parseDom = parseDOMContent(htmlString);

    res.status(201).json({ message: 'Data received successfully', data: req.body, document: htmlString, content: parseDom});
  } catch (err) {
    console.error('Failed to fetch DOM:', err);
    res.status(500).json({ error: 'Failed to fetch DOM' });
  }
});

app.get('/', (_req, res) => {
  res.send('Hello from Express + TypeScript!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
