"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeProductDetails = void 0;
const cheerio = __importStar(require("cheerio"));
const puppeteer = require('puppeteer');
const scrapeProductDetails = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Launch Puppeteer browser
        const browser = yield puppeteer.launch({
            headless: true, // Run in headless mode
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Required for environments like Linux servers
        });
        // Open a new page
        const page = yield browser.newPage();
        // Set a user-agent to simulate a real browser
        yield page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
        // Navigate to the product URL
        yield page.goto(url, { waitUntil: 'networkidle2' });
        // Get the HTML content of the page
        const html = yield page.content();
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
        yield browser.close();
        return {
            title,
            description,
            price,
            reviews,
            ratings
        };
    }
    catch (error) {
        console.error("Error scraping product details:", error);
        throw error;
    }
});
exports.scrapeProductDetails = scrapeProductDetails;
