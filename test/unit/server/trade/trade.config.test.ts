'use strict';

const tradeConfig = require('../../../../server/src/trade/trade.config.json');

describe('Trade Config', () => {
    describe('Type Checking', () => {
        test('broker is a string', () => {
            expect(typeof tradeConfig.broker).toBe('string');
        });

        test('brokerProviders is an object consisting entirely of strings', () => {
            expect(tradeConfig.brokerProviders.constructor.name).toBe('Object');
            expect(Object.values(tradeConfig.brokerProviders).filter(el => typeof el !== 'string').length).toBe(0);
        });

        test('whitelist is an array of strings', () => {
            expect(Array.isArray(tradeConfig.whitelist)).toBeTruthy();
            expect(tradeConfig.whitelist.filter((el: string) => typeof el !== 'string').length).toBe(0);
        });

        test('blacklist is an array of strings', () => {
            expect(Array.isArray(tradeConfig.blacklist)).toBeTruthy();
            expect(tradeConfig.blacklist.filter((el: string) => typeof el !== 'string').length).toBe(0);
        });

        test('tradeAmount is a number', () => {
            expect(typeof tradeConfig.tradeAmount).toBe('number');
        });

        test('maxSymbolsPerJob is a number', () => {
            expect(typeof tradeConfig.maxSymbolsPerJob).toBe('number');
        });

        test('tradeUnit is a string', () => {
            expect(typeof tradeConfig.tradeUnit).toBe('string');
        });

        test('tradeUnitTypes is an object consisting entirely of strings', () => {
            expect(tradeConfig.tradeUnitTypes.constructor.name).toBe('Object');
            expect(Object.values(tradeConfig.tradeUnitTypes).filter(el => typeof el !== 'string').length).toBe(0);
        });
    });

    describe('Data Integrity', () => {
        test('broker exists in the brokerProviders', () => {
            expect(tradeConfig.brokerProviders[tradeConfig.broker]).not.toBeUndefined();
        });

        test('tradeUnit exists in the broker tradeUnitTypes', () => {
            expect(tradeConfig.tradeUnitTypes[tradeConfig.tradeUnit]).not.toBeUndefined();
        });

        test('whitelist entries quantity do not surpass max symbols per job', () => {
            expect(tradeConfig.whitelist.length).toBeLessThanOrEqual(tradeConfig.maxSymbolsPerJob);
        });

        test('whitelist and blacklist have no shared entries', () => {
            const whitelist = tradeConfig.whitelist;
            const blacklist = tradeConfig.blacklist;
            const sharedEntries = whitelist.filter((symbol: string) => blacklist.includes(symbol));
            expect(sharedEntries.length).toEqual(0);
        });
    });
});

export { };
