const express = require('express');
const { handleGenerateNewShortUrl, handleGetOriginalUrl, handleUpdateShortUrl, handleDeleteShortUrl, handleGetUrlStats, handleGetAllShortUrls } = require('../Controllers/url');
const router = express.Router()

router.post('/shorten', handleGenerateNewShortUrl);
router.get('/shorten', handleGetAllShortUrls);
router.get('/shorten/:shortCode', handleGetOriginalUrl);
router.put('/shorten/:shortCode', handleUpdateShortUrl);
router.delete('/shorten/:shortCode', handleDeleteShortUrl);
router.get('/shorten/:shortCode/stats', handleGetUrlStats);

module.exports = router