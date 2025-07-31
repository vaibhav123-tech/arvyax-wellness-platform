const express= require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.get('/articles/:query', async (req, res) => {
    try {
        const { query } = req.params;
        const apiKey = process.env.GNEWS_API_KEY;
        const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=3&token=${apiKey}`;
        const response = await axios.get(url);
        res.json(response.data.articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

module.exports = router;