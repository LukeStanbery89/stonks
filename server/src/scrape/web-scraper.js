import got from 'got';
import { JSDOM } from 'jsdom';

const scrape = async (sourceConfig) => {
    const response = await got(sourceConfig.url);
    const dom = new JSDOM(response.body);
    const nodeList = [...dom.window.document.querySelectorAll(sourceConfig.selectors.row)];
    return nodeList.map((node) => {
        const symbol = node.querySelector(sourceConfig.selectors.symbol).innerHTML.trim().toUpperCase();
        const drillDownLink = node.querySelector(sourceConfig.selectors.drillDownLink).href;
        const ratingText = node.querySelector(sourceConfig.selectors.rating).innerHTML.trim().toUpperCase();
        let rating;
        switch (ratingText) {
            case sourceConfig.constants.BULLISH:
                rating = sourceConfig.constants.BULLISH;
                break;
            case sourceConfig.constants.NEUTRAL:
                rating = sourceConfig.constants.NEUTRAL;
                break;
            case sourceConfig.constants.BEARISH:
                rating = sourceConfig.constants.BEARISH;
            default:
                break;
        }
        return {
            symbol,
            rating,
            drillDownLink,
        };
    });
};

export {
    scrape,
};