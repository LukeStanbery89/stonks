const { getBuyList } = require('../../../../server/src/trade/trade');
const tradeConfig = require('../../../../server/src/trade/trade.config.json');

describe('Trade module', () => {

    it('tradeList() should return an array', () => {
        const tradeList = getBuyList();
        expect(Array.isArray(tradeList)).toBeTruthy();
    });

    it('tradeList() should not return any blacklisted symbols', () => {
        const tradeList = getBuyList();
        const sharedEntries = tradeList.filter((symbol: string) => tradeConfig.BLACKLIST.includes(symbol));
        expect(sharedEntries.length).toEqual(0);
    });

    it('tradeList() should contain all whitelist symbols', () => {
        const tradeList = getBuyList();
        const whitelist = tradeConfig.WHITELIST;
        const sharedEntries = whitelist.filter((symbol: string) => tradeList.includes(symbol));
        expect(sharedEntries.length).toEqual(whitelist.length);
    });
});

export { };