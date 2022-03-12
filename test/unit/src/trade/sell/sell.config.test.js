import sellConfig from '../../../../../src/trade/sell/sell.config.js';
import constants from '../../../../../src/constants';

describe('Sell Module Config', () => {
    describe('Type Checking', () => {
        test('defaultEvalFunctions is a an array of functions', () => {
            expect(sellConfig.defaultEvalFunctions.constructor.name).toBe('Array');
            sellConfig.defaultEvalFunctions.forEach(evalFunc => {
                expect(typeof evalFunc).toBe('function');
            });
        });

        test('strategy.orderType is a string', () => {
            expect(typeof sellConfig.strategy.orderType).toBe('string');
        });

        test('strategy.evalFunctions is a an array of functions', () => {
            expect(sellConfig.strategy.evalFunctions.constructor.name).toBe('Array');
            sellConfig.strategy.evalFunctions.forEach(evalFunc => {
                expect(typeof evalFunc).toBe('function');
            });
        });
    });

    describe('Data Integrity', () => {
        test('strategy.orderType is a valid order type', () => {
            expect(sellConfig.strategy.orderType).toMatch(constants.REGEX.ALPACA_ORDER_TYPES);
        });
    });
});

export { };
