'use strict';

const tradeConfig = require('../../../../server/src/trade/trade.config.json');

describe('Trade Config', () => {
    describe('Type Checking', () => {
        test('BROKER is a string', () => {
            expect(typeof tradeConfig.BROKER).toBe('string');
        });

        test('BROKER_PROVIDERS is an object consisting entirely of strings', () => {
            expect(tradeConfig.BROKER_PROVIDERS.constructor.name).toBe('Object');
            expect(Object.values(tradeConfig.BROKER_PROVIDERS).filter(el => typeof el !== 'string').length).toBe(0);
        });

        test('WHITELIST is an array of strings', () => {
            expect(Array.isArray(tradeConfig.WHITELIST)).toBeTruthy();
            expect(tradeConfig.WHITELIST.filter((el: string) => typeof el !== 'string').length).toBe(0);
        });

        test('BLACKLIST is an array of strings', () => {
            expect(Array.isArray(tradeConfig.BLACKLIST)).toBeTruthy();
            expect(tradeConfig.BLACKLIST.filter((el: string) => typeof el !== 'string').length).toBe(0);
        });

        test('TRADE_AMOUNT is a number', () => {
            expect(typeof tradeConfig.TRADE_AMOUNT).toBe('number');
        });

        test('MAX_SYMBOLS_PER_JOB is a number', () => {
            expect(typeof tradeConfig.MAX_SYMBOLS_PER_JOB).toBe('number');
        });

        test('TRADE_UNIT is a string', () => {
            expect(typeof tradeConfig.TRADE_UNIT).toBe('string');
        });

        test('TRADE_UNIT_TYPES is an object consisting entirely of strings', () => {
            expect(tradeConfig.TRADE_UNIT_TYPES.constructor.name).toBe('Object');
            expect(Object.values(tradeConfig.TRADE_UNIT_TYPES).filter(el => typeof el !== 'string').length).toBe(0);
        });
    });

    describe('Data Integrity', () => {
        test('BROKER exists in the BROKER_PROVIDERS', () => {
            expect(tradeConfig.BROKER_PROVIDERS[tradeConfig.BROKER]).not.toBeUndefined();
        });

        test('TRADE_UNIT exists in the broker TRADE_UNIT_TYPES', () => {
            expect(tradeConfig.TRADE_UNIT_TYPES[tradeConfig.TRADE_UNIT]).not.toBeUndefined();
        });

        test('WHITELIST entries quantity do not surpass max symbols per job', () => {
            expect(tradeConfig.WHITELIST.length).toBeLessThanOrEqual(tradeConfig.MAX_SYMBOLS_PER_JOB);
        });

        test('WHITELIST and BLACKLIST have no shared entries', () => {
            const whitelist = tradeConfig.WHITELIST;
            const blacklist = tradeConfig.BLACKLIST;
            const sharedEntries = whitelist.filter((symbol: string) => blacklist.includes(symbol));
            expect(sharedEntries.length).toEqual(0);
        });
    });
});

export { };
