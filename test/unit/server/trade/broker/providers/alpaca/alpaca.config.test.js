'use strict';

import alpacaConfig from '../../../../../../../server/src/trade/broker/providers/alpaca/alpaca.config.json';

describe("Alpaca Provider Config", () => {
    test("Live API endpoint domain is valid URL", () => {
        expect(isValidHttpUrl(alpacaConfig.liveApiBaseUrl)).toBe(true);
    });

    test("Test API endpoint domain is valid URL", () => {
        expect(isValidHttpUrl(alpacaConfig.testApiBaseUrl)).toBe(true);
    });
});

function isValidHttpUrl(input) {
    let url;
    try {
        url = new URL(input);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
