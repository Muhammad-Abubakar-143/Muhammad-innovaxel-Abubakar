// controllers/url.controller.js
const { nanoid } = require('nanoid');
const Url = require('../Models/url');

async function handleGenerateNewShortUrl(req, res) {
  const { url } = req.body;

  // 1. Validate request body
  if (!url || typeof url !== 'string' || !url.trim()) {
    return res.status(400).json({ error: 'Invalid or missing "url" in request body.' });
  }

  try {
    // 2. Attempt to create with first shortCode
    const shortCode = nanoid(6);
    const created = await Url.create({ url: url.trim(), shortCode });

    return res.status(201).json({
      id:        created._id,
      url:       created.url,
      shortCode: created.shortCode,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });

  } catch (err) {
    // 3. If shortCode is duplicate, retry once
    if (err.code === 11000 && err.keyPattern?.shortCode) {
      try {
        const retryCode = nanoid(6);
        const retry = await Url.create({ url: url.trim(), shortCode: retryCode });

        return res.status(201).json({
          id:        retry._id,
          url:       retry.url,
          shortCode: retry.shortCode,
          createdAt: retry.createdAt,
          updatedAt: retry.updatedAt,
        });
      } catch (retryErr) {
        console.error('Retry failed:', retryErr);
        return res.status(500).json({ error: 'Failed after retrying short code generation.' });
      }
    }

    // 4. Other unexpected errors
    console.error('Error creating short URL:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = {
  handleGenerateNewShortUrl,
};
