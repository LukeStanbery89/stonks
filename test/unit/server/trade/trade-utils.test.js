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
        const testEvalFunc1 = jest.fn(() => true);
        const testEvalFunc2 = jest.fn(() => true);
        const testEvalFunc3 = jest.fn(() => true);
        const evalFunctions = [
            testEvalFunc1,
            testEvalFunc2,
            testEvalFunc3,
        ];
        const result = composeEvalFunctions(evalFunctions);

        expect(result.constructor.name).toBe('Array');
        result.forEach(evalFunc => {
            expect(typeof evalFunc).toBe('function');
        });
        expect(testEvalFunc1).toHaveBeenCalled();
    });
});
