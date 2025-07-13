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
      id:        created.id,
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
          id:        retry.id,
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




async function handleGetOriginalUrl(req, res) {
  const { shortCode } = req.params;

  try {
    const found = await Url.findOne({ shortCode });

    if (!found) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    // Optional: increase access count
    found.accessCount += 1;
    await found.save();

    return res.status(200).json({
      id: found.id,
      url: found.url,
      shortCode: found.shortCode,
      createdAt: found.createdAt,
      updatedAt: found.updatedAt,
      accessCount: found.accessCount,
    });
  } catch (err) {
    console.error('Error retrieving URL:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleUpdateShortUrl(req, res) {
  const { shortCode } = req.params;
  const { url } = req.body;

  // Validate new URL
  if (!url || typeof url !== 'string' || !url.trim()) {
    return res.status(400).json({ error: 'Invalid or missing "url" in request body.' });
  }

  try {
    const found = await Url.findOne({ shortCode });

    if (!found) {
      return res.status(404).json({ error: 'Short URL not found.' });
    }

    found.url = url.trim();
    found.updatedAt = new Date();

    await found.save();

    return res.status(200).json({
      id: found._id,
      url: found.url,
      shortCode: found.shortCode,
      createdAt: found.createdAt,
      updatedAt: found.updatedAt
    });

  } catch (err) {
    console.error('Error updating short URL:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}


async function handleDeleteShortUrl(req, res) {
  const { shortCode } = req.params;

  try {
    const deleted = await Url.findOneAndDelete({ shortCode });

    if (!deleted) {
      return res.status(404).json({ error: 'Short URL not found.' });
    }

    // 204 = No Content
    return res.status(204).send();

  } catch (err) {
    console.error('Error deleting short URL:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}


async function handleGetUrlStats(req, res) {
  const { shortCode } = req.params;

  try {
    const urlData = await Url.findOne({ shortCode });

    if (!urlData) {
      return res.status(404).json({ error: 'Short URL not found.' });
    }

    return res.status(200).json({
      id: urlData._id,
      url: urlData.url,
      shortCode: urlData.shortCode,
      createdAt: urlData.createdAt,
      updatedAt: urlData.updatedAt,
      accessCount: urlData.accessCount || 0
    });

  } catch (err) {
    console.error('Error getting URL stats:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

async function handleGetAllShortUrls(req, res) {
  try {
    const urls = await Url.find().sort({ createdAt: -1 }); 

    return res.status(200).json(urls.map(doc => ({
      id: doc._id,
      url: doc.url,
      shortCode: doc.shortCode,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      accessCount: doc.accessCount
    })));
  } catch (err) {
    console.error("Error fetching URLs:", err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = {
  handleGenerateNewShortUrl,
  handleGetOriginalUrl,
  handleUpdateShortUrl,
  handleDeleteShortUrl,
  handleGetUrlStats,
  handleGetAllShortUrls,
};
