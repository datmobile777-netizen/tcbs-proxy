const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/stock/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const url = `https://apipubaws.tcbs.com.vn/stock-insight/v1/stock/bars-long-term?ticker=${symbol}&type=stock&resolution=D&countBack=100`;
  try {
    const r = await axios.get(url, {
      headers: { Referer: 'https://tcinvest.tcbs.com.vn/' }
    });
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3001, () => console.log('Proxy running'));
