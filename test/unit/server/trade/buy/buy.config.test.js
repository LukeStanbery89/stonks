import buyConfig from '../../../../../server/src/trade/buy/buy.config.js';

describe('Buy Module Config', () => {
    describe('Type Checking', () => {
        test('strategy is an array of functions', () => {
            expect(buyConfig.strategy.constructor.name).toBe('Array');
            buyConfig.strategy.forEach(evalFunc => {
                expect(typeof evalFunc).toBe('function');
            });
        });
    });
});

export { };
