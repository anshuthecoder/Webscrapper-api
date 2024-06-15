const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const ScrapedData = require('../models/ScrapedData');

const router = express.Router();

router.post('/scrape', async (req, res) => {
  const { url } = req.body;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const name = $('meta[property="og:site_name"]').attr('content') || $('title').text();
    const description = $('meta[name="description"]').attr('content');
    const companyLogo = $('link[rel="icon"]').attr('href');
    const facebookUrl = $('a[href*="facebook.com"]').attr('href');
    const linkedinUrl = $('a[href*="linkedin.com"]').attr('href');
    const twitterUrl = $('a[href*="twitter.com"]').attr('href');
    const instagramUrl = $('a[href*="instagram.com"]').attr('href');
    const address = $('address').text();
    const phoneNumber = $('a[href^="tel:"]').text();
    const email = $('a[href^="mailto:"]').text();

    const scrapedData = new ScrapedData({
      name,
      description,
      companyLogo,
      facebookUrl,
      linkedinUrl,
      twitterUrl,
      instagramUrl,
      address,
      phoneNumber,
      email
    });

    await scrapedData.save();
    res.json(scrapedData);
  } catch (error) {
    res.status(500).send('Error scraping website');
  }
});

router.get('/data', async (req, res) => {
  try {
    const data = await ScrapedData.find();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

router.post('/delete', async (req, res) => {
  const { ids } = req.body;
  try {
    await ScrapedData.deleteMany({ _id: { $in: ids } });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send('Error deleting data');
  }
});

module.exports = router;
