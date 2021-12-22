const webScraper = require('./web-scraper');
const scraperConfig = require('./scraper.config.json');

const beginScraping = async (): Promise<void> => {
    scraperConfig.sources.forEach(async (source: object) => {
        console.log(await webScraper.scrape(source));
    });
};
beginScraping();