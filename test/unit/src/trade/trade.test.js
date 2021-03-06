import { composeEvalFunctions, evaluateSecurityCandidates, generateProcessingContext, getSecurityData } from '../../../../src/trade/trade';
import { getAxios200Response } from '../../fixtures/axios.js';

describe('Trade Engine', () => {
    beforeAll(() => {
        const mockTradeConfig = {
            broker: 'FAKE_BROKER',
            brokerProviders: {
                FAKE_BROKER: 'fake-provider',
            },
        };
        jest.doMock('../../../../src/trade/trade.config.js', () => mockTradeConfig);

        const axiosResponse = getAxios200Response({ data: [{}] });
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
    });

    test('generateProcessingContext() returns a new processingContext object', async () => {
        const result = await generateProcessingContext();
        expect(result).toEqual(
            expect.objectContaining({
                accountActivityToday: expect.any(Array),
                history: [],
                orders: expect.any(Array),
                positions: expect.any(Array),
            })
        );
    });

    test('generateProcessingContext() returns a new processingContext object with any provided overrides', async () => {
        const accountActivityToday = ['test accountActivityToday'];
        const history = ['test history'];
        const orders = ['test orders'];
        const positions = ['test positions'];
        const overrides = {
            accountActivityToday,
            history,
            orders,
            positions,
        };
        const result = await generateProcessingContext(overrides);
        expect(result).toEqual(
            expect.objectContaining({
                accountActivityToday,
                history: [], // History should never be overridden, and should always return an empty array
                orders,
                positions,
            })
        );
    });

    test('evaluateSecurityCandidates() returns a list of securities to be purchased', async () => {
        const mockEval = jest.fn(() => new Promise(resolve => resolve(true)));
        const mockOmitDDD = jest.fn(securityData => new Promise(resolve => resolve(securityData.symbol !== 'DDD')));
        const securities = [
            { symbol: 'AAA' },
            { symbol: 'BBB' },
            { symbol: 'CCC' },
            { symbol: 'DDD' },
        ];
        const evalFunctions = [
            mockEval,
            mockOmitDDD,
            mockEval,
        ];
        const result = await evaluateSecurityCandidates(securities, evalFunctions);

        expect(result.symbolsToTrade).toStrictEqual([{ symbol: 'AAA' }, { symbol: 'BBB' }, { symbol: 'CCC' }]);
        expect(mockEval).toHaveBeenCalledTimes(7);
        expect(mockOmitDDD).toHaveBeenCalledTimes(4);
    });

    test('getSecurityData() returns a securityData object', async () => {
        const result = await getSecurityData({
            symbol: 'AAPL',
            qty: 1,
            marketValue: 10.00,
            currentPrice: 100.00,
        });
        expect(result).toEqual(
            expect.objectContaining({
                symbol: expect.any(String),
                notional: expect.any(Number),
                price: expect.any(Number),
                closePrice: expect.any(Number),
                marketCap: expect.any(Number),
                marketCapSize: expect.any(String),
            })
        );
    });

    test('composeEvalFunctions() returns an array of functions', async () => {
        const evalFunctions = [
            jest.fn(() => true),
            jest.fn(() => true),
            jest.fn(() => true),
        ];
        const result = await composeEvalFunctions(evalFunctions);

        expect(result.constructor.name).toBe('Array');
        expect(result.length).toBe(3);
        result.forEach(evalFunc => {
            expect(typeof evalFunc).toBe('function');
        });
    });
});
