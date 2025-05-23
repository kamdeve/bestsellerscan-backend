import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/keepa', async (req, res) => {
  const { asin } = req.query;
  if (!asin) return res.status(400).json({ error: 'No ASIN' });

  // Tu przykładowa odpowiedź
  res.json({
    products: [
      {
        csv: [
          [], // Placeholder (index 0)
          [], // Placeholder (index 1, price)
          [], // Placeholder (index 2)
          []  // Placeholder (index 3, bsr)
        ]
      }
    ]
  });
});

app.get('/', (req, res) => {
  res.send('BestsellerScan backend API');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
