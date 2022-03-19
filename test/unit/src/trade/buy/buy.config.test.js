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

        test('strategies is an array', () => {
            expect(buyConfig.strategies.constructor.name).toBe('Array');
        });

        test('strategies is an array of strategy objects', () => {
            buyConfig.strategies.forEach((strategy) => {
                expect(strategy).toEqual(
                    expect.objectContaining({
                        orderType: expect.any(String),
                        evalFunctions: expect.any(Array),
                    })
                );
            });
        });

        test('buyConfig.strategies.evalFunctions is an array of functions', () => {
            buyConfig.strategies.forEach((strategy) => {
                strategy.evalFunctions.forEach(evalFunc => {
                    expect(typeof evalFunc).toBe('function');
                });
            });
        });
    });

    describe('Data Integrity', () => {
        test('strategy.orderType is a valid order type', () => {
            buyConfig.strategies.forEach((strategy) => {
                expect(strategy.orderType).toMatch(constants.REGEX.ALPACA_ORDER_TYPES);
            });
        });
    });
});

export { };
