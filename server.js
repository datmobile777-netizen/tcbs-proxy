const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/stock/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const to = Math.floor(Date.now() / 1000);
  const from = to - 60 * 60 * 24 * 120;
  const url = `https://trading.vietcap.com.vn/api/chart/OHLCBars?tickerSymbol=${symbol}&fromDate=${from}&toDate=${to}&resolution=D`;
  try {
    const r = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Origin': 'https://trading.vietcap.com.vn',
        'Referer': 'https://trading.vietcap.com.vn/'
      }
    });
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3001, () => console.log('Proxy running'));
