const tradeConfig = require('../../../server/src/trade-config.json');

describe('Trade Config', () => {
    it('Stocks whitelist entries quantity should never surpass max symbols per job', () => {
        expect(tradeConfig.WHITELIST.length).toBeLessThanOrEqual(tradeConfig.MAX_SYMBOLS_PER_JOB);
    });

    it('Stocks whitelist and blacklist should have no shared entries', () => {
        const whitelist = tradeConfig.WHITELIST;
        const blacklist = tradeConfig.BLACKLIST;
        const sharedEntries = whitelist.filter(symbol => blacklist.includes(symbol));
        expect(sharedEntries.length).toEqual(0);
    });
});