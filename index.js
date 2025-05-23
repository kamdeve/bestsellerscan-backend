// index.js
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/keepa', async (req, res) => {
  const { asin } = req.query;
  const KEEPPA_KEY = process.env.KEEPA_KEY || 'TWÓJ_KEEPA_API_KEY';

  if (!asin || !KEEPPA_KEY) {
    return res.status(400).json({ error: 'Missing asin or Keepa API key' });
  }

  try {
    const url = `https://api.keepa.com/product?key=${KEEPPA_KEY}&domain=1&asin=${asin}&history=1&buybox=1&offers=0&stats=0&buybox=1`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data from Keepa', details: err.toString() });
  }
});

app.get('/', (req, res) => {
  res.send('Keepa Proxy API works!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
