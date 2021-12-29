'use strict';

const alpacaConfig = require('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca.config.json');

describe("Alpaca Provider Config", () => {
    test("Live API endpoint domain is valid URL", () => {
        expect(isValidHttpUrl(alpacaConfig.LIVE_API_BASE_URL)).toBe(true);
    });

    test("Test API endpoint domain is valid URL", () => {
        expect(isValidHttpUrl(alpacaConfig.TEST_API_BASE_URL)).toBe(true);
    });
});

function isValidHttpUrl(input: string) {
    let url;
    try {
        url = new URL(input);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
