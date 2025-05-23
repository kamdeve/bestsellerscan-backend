import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;
const KEEPA_KEY = process.env.KEEPA_KEY;

// Używamy CORS, żeby frontend mógł pytać z dowolnej domeny
app.use(cors());

// Prosty endpoint testowy (możesz wejść na / żeby sprawdzić czy serwer działa)
app.get("/", (req, res) => {
  res.send("BestsellerScan backend API");
});

// Endpoint Keepa
app.get("/keepa", async (req, res) => {
  const { asin } = req.query;
  console.log("===> Odebrano zapytanie do /keepa endpoint!");
  console.log("Przyszedł ASIN:", asin);

  if (!asin) {
    console.log("Brak ASIN w zapytaniu!");
    return res.status(400).json({ error: "Brak ASIN" });
  }
  if (!KEEPA_KEY) {
    console.log("Brak KEEPA_KEY w środowisku!");
    return res.status(500).json({ error: "Brak KEEPA_KEY" });
  }

  try {
    // Budujemy URL do Keepa API
    const url = `https://api.keepa.com/product?key=${KEEPA_KEY}&domain=1&asin=${asin}&history=1`;
    console.log("Wysyłam zapytanie do Keepa:", url);

    const keepaRes = await fetch(url);
    const data = await keepaRes.json();

    // Logujemy odpowiedź (możesz to zakomentować jeśli pojawi się za dużo danych)
    console.log("Odpowiedź Keepa:", JSON.stringify(data).slice(0, 300) + "...");

    if (!data || !data.products || !data.products.length) {
      console.log("Brak danych z Keepa!");
      return res.status(404).j
