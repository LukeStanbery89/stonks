import buyConfig from '../../../../../src/trade/buy/buy.config.js';
import constants from '../../../../../src/constants';

describe('Buy Module Config', () => {
    describe('Type Checking', () => {
        test('defaultEvalFunctions is an array of functions', () => {
            expect(buyConfig.defaultEvalFunctions.constructor.name).toBe('Array');
            buyConfig.defaultEvalFunctions.forEach(evalFunc => {
                expect(typeof evalFunc).toBe('function');
            });
        });

        test('strategy.orderType is a string', () => {
            expect(typeof buyConfig.strategy.orderType).toBe('string');
        });

        test('strategy.evalFunctions is an array of functions', () => {
            expect(buyConfig.strategy.evalFunctions.constructor.name).toBe('Array');
            buyConfig.strategy.evalFunctions.forEach(evalFunc => {
                expect(typeof evalFunc).toBe('function');
            });
        });
    });

    describe('Data Integrity', () => {
        test('strategy.orderType is a valid order type', () => {
            expect(buyConfig.strategy.orderType).toMatch(constants.REGEX.ALPACA_ORDER_TYPES);
        });
    });
});

export { };
