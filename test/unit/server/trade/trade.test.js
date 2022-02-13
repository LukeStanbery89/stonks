import { composeEvalFunctions, evaluateSecurityCandidates, generateProcessingContext, getSecurityData } from '../../../../server/src/trade/trade';
import { getAxios200Response } from '../../fixtures/axios.js';

describe('Trade Engine', () => {
    beforeAll(() => {
        const mockTradeConfig = {
            broker: 'FAKE_BROKER',
            brokerProviders: {
                FAKE_BROKER: 'fake-provider',
            },
            commands: {
                BUY: 'buy',
                SELL: 'sell',
                GET_POSITIONS: 'getPositions',
                GET_POSITION: 'getPosition',
                GET_ACCOUNT_INFO: 'getAccountInfo'
            },
        };
        jest.doMock('../../../../server/src/trade/trade.config.js', () => mockTradeConfig);

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
                history: expect.any(Array),
                orders: expect.any(Array),
                positions: expect.any(Array),
            })
        );
    });

    test('evaluateSecurityCandidates() returns a list of securities to be purchased', async () => {
        const mockEval = jest.fn(() => new Promise(resolve => resolve(true)));
        const mockOmitDDD = jest.fn(securityData => new Promise(resolve => resolve(securityData.symbol !== 'DDD')));
        const symbols = ['AAA', 'BBB', 'CCC', 'DDD'];
        const evalFunctions = [
            mockEval,
            mockOmitDDD,
            mockEval,
        ];
        const result = await evaluateSecurityCandidates(symbols, evalFunctions);

        expect(result).toStrictEqual(['AAA', 'BBB', 'CCC']);
        expect(mockEval).toHaveBeenCalledTimes(7);
        expect(mockOmitDDD).toHaveBeenCalledTimes(4);
    });

    test('getSecurityData() returns a securityData object', async () => {
        const result = await getSecurityData('AAPL');
        expect(result).toEqual(
            expect.objectContaining({
                symbol: expect.any(String),
                name: expect.any(String),
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
