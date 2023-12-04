const express = require('express');
const bodyParser = require('body-parser');
const router = express();
const openaiService = require('../services/openaiService.js');

router.use(bodyParser.json());

router.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  var chatbotResponse = await openaiService.main(userMessage);
  res.json({ response: chatbotResponse });
});

module.exports = router;