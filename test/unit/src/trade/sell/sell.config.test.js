import sellConfig from '../../../../../src/trade/sell/sell.config.js';
import constants from '../../../../../src/constants';

describe('Sell Module Config', () => {
    describe('Type Checking', () => {
        test('defaultEvalFunctions is an array of functions', () => {
            expect(sellConfig.defaultEvalFunctions.constructor.name).toBe('Array');
            sellConfig.defaultEvalFunctions.forEach(evalFunc => {
                expect(typeof evalFunc).toBe('function');
            });
        });

        test('strategies is an array', () => {
            expect(sellConfig.strategies.constructor.name).toBe('Array');
        });

        test('strategies is an array of strategy objects', () => {
            sellConfig.strategies.forEach((strategy) => {
                expect(strategy).toEqual(
                    expect.objectContaining({
                        marketType: 'CRYPTO',
                        orderType: expect.any(String),
                        evalFunctions: expect.any(Array),
                    })
                );
            });
        });

        test('strategies.evalFunctions is an array of functions', () => {
            sellConfig.strategies.forEach((strategy) => {
                strategy.evalFunctions.forEach(evalFunc => {
                    expect(typeof evalFunc).toBe('function');
                });
            });
        });
    });

    describe('Data Integrity', () => {
        test('strategy.orderType is a valid order type', () => {
            sellConfig.strategies.forEach((strategy) => {
                expect(strategy.orderType).toMatch(constants.REGEX.ALPACA_ORDER_TYPES);
            });
        });

        test('strategy.marketType is a valid market type', () => {
            sellConfig.strategies.forEach((strategy) => {
                expect(strategy.marketType).toMatch(constants.REGEX.MARKET_TYPES);
            });
        });
    });
});

export { };
