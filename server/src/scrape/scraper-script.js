'use strict';

import * as webScraper from './web-scraper';
import scraperConfig from './scraper.config.json';

const beginScraping = async () => {
    scraperConfig.sources.forEach(async (source) => {
        console.log(await webScraper.scrape(source));
    });
};

beginScraping();
