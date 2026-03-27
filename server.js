const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`YOUR HTML GOES HERE`);
});

app.post('/api/generate', async (req, res) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch(err) {
    res.status(500).json({ error: { message: err.message } });
  }
});

module.exports = app;
