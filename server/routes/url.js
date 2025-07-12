const express = require('express');
const { handleGenerateNewShortUrl } = require('../Controllers/url');
const router = express.Router()

router.post('/', handleGenerateNewShortUrl)

module.exports = router