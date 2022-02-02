'use strict';

const mockTradeConfig = {
    blacklist: [
        'BAD',
    ],
};
jest.doMock('../../../../../../../server/src/trade/trade.config.js', () => mockTradeConfig);

let omitBlacklistedSecurities;

describe('Common Evaluator Functions', () => {
    beforeAll(async () => {
        const sharedCommonEvalsModule = (await import('../../../../../../../server/src/trade/strategies/shared/common/common-evals.js'));
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
});
