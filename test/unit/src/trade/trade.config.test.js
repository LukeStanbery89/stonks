import tradeConfig from '../../../../src/trade/trade.config.js';
import CONSTANTS from '../../../../src/constants';

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
            expect(tradeConfig.whitelist.filter((el) => typeof el !== 'string').length).toBe(0);
        });

        test('blacklist is an array of strings', () => {
            expect(Array.isArray(tradeConfig.blacklist)).toBeTruthy();
            expect(tradeConfig.blacklist.filter((el) => typeof el !== 'string').length).toBe(0);
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
    });

    describe('Data Integrity', () => {
        test('broker exists in the brokerProviders', () => {
            expect(tradeConfig.brokerProviders[tradeConfig.broker]).not.toBeUndefined();
        });

        test('tradeUnit exists in CONSTANTS.TRADE_UNIT_TYPES', () => {
            expect(CONSTANTS.TRADE_UNIT_TYPES[tradeConfig.tradeUnit]).not.toBeUndefined();
        });

        test('whitelist entries quantity do not surpass max symbols per job', () => {
            expect(tradeConfig.whitelist.length).toBeLessThanOrEqual(tradeConfig.maxSymbolsPerJob);
        });

        test('whitelist and blacklist have no shared entries', () => {
            const whitelist = tradeConfig.whitelist;
            const blacklist = tradeConfig.blacklist;
            const sharedEntries = whitelist.filter((symbol) => blacklist.includes(symbol));
            expect(sharedEntries.length).toEqual(0);
        });
    });
});

export { };
