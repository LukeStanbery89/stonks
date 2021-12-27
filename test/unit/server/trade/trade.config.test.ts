'use strict';

const tradeConfig = require('../../../../server/src/trade/trade.config.json');

describe('Trade Config', () => {
    describe('Type Checking', () => {
        it('BROKER is a string', () => {
            expect(typeof tradeConfig.BROKER).toBe('string');
        });

        it('BROKER_PROVIDERS is an object consisting entirely of strings', () => {
            expect(tradeConfig.BROKER_PROVIDERS.constructor.name).toBe('Object');
            expect(Object.values(tradeConfig.BROKER_PROVIDERS).filter(el => typeof el !== 'string').length).toBe(0);
        });

        it('WHITELIST is an array of strings', () => {
            expect(Array.isArray(tradeConfig.WHITELIST)).toBeTruthy();
            expect(tradeConfig.WHITELIST.filter((el: string) => typeof el !== 'string').length).toBe(0);
        });

        it('BLACKLIST is an array of strings', () => {
            expect(Array.isArray(tradeConfig.BLACKLIST)).toBeTruthy();
            expect(tradeConfig.BLACKLIST.filter((el: string) => typeof el !== 'string').length).toBe(0);
        });

        it('TRADE_AMOUNT is a number', () => {
            expect(typeof tradeConfig.TRADE_AMOUNT).toBe('number');
        });

        it('MAX_SYMBOLS_PER_JOB is a number', () => {
            expect(typeof tradeConfig.MAX_SYMBOLS_PER_JOB).toBe('number');
        });

        it('TRADE_UNIT is a string', () => {
            expect(typeof tradeConfig.TRADE_UNIT).toBe('string');
        });

        it('TRADE_UNIT_TYPES is an object consisting entirely of strings', () => {
            expect(tradeConfig.TRADE_UNIT_TYPES.constructor.name).toBe('Object');
            expect(Object.values(tradeConfig.TRADE_UNIT_TYPES).filter(el => typeof el !== 'string').length).toBe(0);
        });
    });

    describe('Data Integrity', () => {
        it('BROKER exists in the BROKER_PROVIDERS', () => {
            expect(tradeConfig.BROKER_PROVIDERS[tradeConfig.BROKER]).not.toBeUndefined();
        });

        it('TRADE_UNIT exists in the broker TRADE_UNIT_TYPES', () => {
            expect(tradeConfig.TRADE_UNIT_TYPES[tradeConfig.TRADE_UNIT]).not.toBeUndefined();
        });

        it('WHITELIST entries quantity do not surpass max symbols per job', () => {
            expect(tradeConfig.WHITELIST.length).toBeLessThanOrEqual(tradeConfig.MAX_SYMBOLS_PER_JOB);
        });

        it('WHITELIST and BLACKLIST have no shared entries', () => {
            const whitelist = tradeConfig.WHITELIST;
            const blacklist = tradeConfig.BLACKLIST;
            const sharedEntries = whitelist.filter((symbol: string) => blacklist.includes(symbol));
            expect(sharedEntries.length).toEqual(0);
        });
    });
});

export { };
