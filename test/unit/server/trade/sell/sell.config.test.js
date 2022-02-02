import sellConfig from '../../../../../server/src/trade/sell/sell.config.js';

describe('Buy Module Config', () => {
    describe('Type Checking', () => {
        test('strategy is a string', () => {
            expect(sellConfig.strategy.constructor.name).toBe('Array');
            sellConfig.strategy.forEach(evalFunc => {
                expect(typeof evalFunc).toBe('function');
            });
        });
    });
});

export { };
