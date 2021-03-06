import { noOpenBuyOrder, noOpenOrder, noOpenSellOrder, securityNotTradedToday } from '../../../../../../src/trade/strategies/eval-functions/shared-eval-functions.js';

jest.mock('../../../../../../src/trade/trade.config.js', () => ({
    blacklist: [
        'BAD',
    ],
}));

let omitBlacklistedSecurities;

describe('Common Evaluator Functions', () => {
    beforeAll(async () => {
        const sharedCommonEvalsModule = (await import('../../../../../../src/trade/strategies/eval-functions/shared-eval-functions.js'));
        omitBlacklistedSecurities = sharedCommonEvalsModule.omitBlacklistedSecurities;
    });

    test('omitBlacklistedSecurities() accepts any non-blacklisted securities', async () => {
        const securityData = {
            symbol: 'GOOD',
        };
        const result = await omitBlacklistedSecurities(securityData);
        expect(result).toBe(true);
    });

    test('omitBlacklistedSecurities() rejects any blacklisted securities', async () => {
        const securityData = {
            symbol: 'BAD',
        };
        const result = await omitBlacklistedSecurities(securityData);
        expect(result).toBe(false);
    });

    test('noOpenOrder() rejects any security with an open order of any kind', async () => {
        const securityData = {
            symbol: 'FAKE',
        };
        const processingContext = {
            orders: [
                {
                    symbol: 'FAKE',
                },
            ],
        };
        const result = await noOpenOrder(securityData, processingContext);
        expect(result).toBe(false);
    });

    test('noOpenOrder() accepts any security without an open order of any kind', async () => {
        const securityData = {
            symbol: 'FAKE',
        };
        const processingContext = {
            orders: [
                {
                    symbol: 'OTHER',
                },
            ],
        };
        const result = await noOpenOrder(securityData, processingContext);
        expect(result).toBe(true);
    });

    test('noOpenOrder() rejects the security when the `processingContext.orders` array is undefined', async () => {
        const securityData = {
            symbol: 'FAKE',
        };
        const processingContext = {};
        return expect(async () => {
            await noOpenOrder(securityData, processingContext);
        }).rejects.toThrow('Cannot read propert');
    });

    test('noOpenBuyOrder() rejects any security with an open buy order', async () => {
        const securityData = {
            symbol: 'FAKE',
        };
        const processingContext = {
            orders: [
                {
                    symbol: 'OTHER',
                    side: 'buy',
                },
                {
                    symbol: 'FAKE',
                    side: 'buy',
                },
            ],
        };
        const result = await noOpenBuyOrder(securityData, processingContext);
        expect(result).toBe(false);
    });

    test('noOpenBuyOrder() accepts any security without an open buy order', async () => {
        const securityData = {
            symbol: 'FAKE',
        };
        const processingContext = {
            orders: [
                {
                    symbol: 'OTHER1',
                    side: 'buy',
                },
                {
                    symbol: 'OTHER2',
                    side: 'buy',
                },
            ],
        };
        const result = await noOpenBuyOrder(securityData, processingContext);
        expect(result).toBe(true);
    });

    test('noOpenBuyOrder() rejects the security when the `processingContext.orders` array is undefined', async () => {
        const securityData = {
            symbol: 'FAKE',
        };
        const processingContext = {};
        const result = await noOpenBuyOrder(securityData, processingContext);
        expect(result).toBe(false);
    });

    test('noOpenSellOrder() rejects any security with an open sell order', async () => {
        const securityData = {
            symbol: 'FAKE',
        };
        const processingContext = {
            orders: [
                {
                    symbol: 'OTHER',
                    side: 'sell',
                },
                {
                    symbol: 'FAKE',
                    side: 'sell',
                },
            ],
        };
        const result = await noOpenSellOrder(securityData, processingContext);
        expect(result).toBe(false);
    });

    test('noOpenSellOrder() accepts any security without an open sell order', async () => {
        const securityData = {
            symbol: 'FAKE',
        };
        const processingContext = {
            orders: [
                {
                    symbol: 'OTHER1',
                    side: 'sell',
                },
                {
                    symbol: 'OTHER2',
                    side: 'sell',
                },
            ],
        };
        const result = await noOpenSellOrder(securityData, processingContext);
        expect(result).toBe(true);
    });

    test('noOpenSellOrder() rejects the security when the `processingContext.orders` array is undefined', async () => {
        const securityData = {
            symbol: 'FAKE',
        };
        const processingContext = {};
        const result = await noOpenSellOrder(securityData, processingContext);
        expect(result).toBe(false);
    });

    test('securityNotTradedToday() accepts any security not traded today', async () => {
        const securityData = {
            symbol: 'FAKE',
        };
        const processingContext = {
            accountActivityToday: [
                {
                    symbol: 'OTHER1',
                },
                {
                    symbol: 'OTHER2',
                },
                {
                    symbol: 'OTHER3',
                },
            ],
        };
        const result = await securityNotTradedToday(securityData, processingContext);
        expect(result).toBe(true);
    });

    test('securityNotTradedToday() rejects any security traded today', async () => {
        const securityData = {
            symbol: 'FAKE',
        };
        const processingContext = {
            accountActivityToday: [
                {
                    symbol: 'OTHER1',
                },
                {
                    symbol: 'FAKE',
                },
                {
                    symbol: 'OTHER3',
                },
            ],
        };
        const result = await securityNotTradedToday(securityData, processingContext);
        expect(result).toBe(false);
    });
});
