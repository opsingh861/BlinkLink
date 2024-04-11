const axios = require('axios');
const https = require('https');
const cheerio = require('cheerio');

const agent = new https.Agent({
  rejectUnauthorized: false
});

async function getTitleFromUrl(url) {
  try {
    const response = await axios.get(url, {
      httpsAgent: agent
    });
    const html = response.data;
    
    // Load the HTML into cheerio
    const $ = cheerio.load(html);

    // Extract the title tag
    const title = $('title').text();

    return title;
  } catch (error) {
    console.error('Error fetching title:', error);
    return null;
  }
}

module.exports = getTitleFromUrl;