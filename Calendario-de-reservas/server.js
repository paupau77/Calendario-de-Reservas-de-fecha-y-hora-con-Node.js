// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let reservas = [];

app.post('/api/bookings', (req, res) => {
  const { date, hour } = req.body;
  if (reservas.find(r => r.date === date && r.hour === hour)) {
    return res.status(400).json({ error: "Ya está reservado ese horario" });
  }
  reservas.push({ date, hour });
  res.json({ ok: true });
});

app.get('/api/bookings', (req, res) => {
  res.json(reservas);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});