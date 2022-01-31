import { composeEvalFunctions, getSecurityData } from '../../../../server/src/trade/trade-utils';

describe('Trade Utils', () => {
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

    test('composeEvalFunctions() returns an array of functions', () => {
        const evalFunctions = [
            jest.fn(() => true),
            jest.fn(() => true),
            jest.fn(() => true),
        ];
        const result = composeEvalFunctions(evalFunctions);

        expect(result.constructor.name).toBe('Array');
        result.forEach(evalFunc => {
            expect(typeof evalFunc).toBe('function');
        });
    });
});
