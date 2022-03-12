import buyConfig from '../../../../../src/trade/buy/buy.config.js';

describe('Buy Module Config', () => {
    describe('Type Checking', () => {
        test('defaultEvalFunctions is an array of functions', () => {
            expect(buyConfig.defaultEvalFunctions.constructor.name).toBe('Array');
            buyConfig.defaultEvalFunctions.forEach(evalFunc => {
                expect(typeof evalFunc).toBe('function');
            });
        });

        test('strategy is an array of functions', () => {
            expect(buyConfig.strategy.constructor.name).toBe('Array');
            buyConfig.strategy.forEach(evalFunc => {
                expect(typeof evalFunc).toBe('function');
            });
        });
    });
});

export { };
