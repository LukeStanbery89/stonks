const buyConfig = require('../../../../../server/src/trade/buy/buy.config.json');

describe('Buy Module Config', () => {
    describe('Type Checking', () => {
        test('strategies should be an array of objects', () => {
            expect(buyConfig.strategies.constructor.name).toBe('Array');
            expect(Object.values(buyConfig.strategies).filter(el => typeof el !== 'string').length).toBe(0);
        });
    });
});

export { };
