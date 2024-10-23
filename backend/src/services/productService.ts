import * as cheerio from 'cheerio';
const puppeteer = require('puppeteer');

export const scrapeProductDetails = async (url: string) => {
  try {
    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
        headless: true, // Run in headless mode
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Required for environments like Linux servers
    });

    // Open a new page
    const page = await browser.newPage();

    // Set a user-agent to simulate a real browser
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');

    // Navigate to the product URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Get the HTML content of the page
    const html = await page.content();
    const $ = cheerio.load(html);
    const title = $('span.VU-ZEz').text().trim();  
    let description = $('div.Xbd0Sd').text().trim(); 
    if (description.startsWith("Description")) {
      description = description.replace("Description", "").trim();
    }
    const price = $('div.Nx9bqj.CxhGGd').first().text().replace('₹', '').replace(',', '').trim(); 
    const reviews = $('div.ipqd2A').first().text().trim(); 
    const ratings = $('span.Wphh3N').first().text().split(' ')[0].trim();

    // Log the HTML content
    // console.log(title);
    // console.log(description);
    console.log(price);
    // console.log(reviews);
    // console.log(ratings);
    
    // Close the browser
    await browser.close();
    return {
      title,
      description,
      price,
      reviews,
      ratings
    };
  } catch (error) {
      console.error("Error scraping product details:", error);
      throw error;
  }  
};
