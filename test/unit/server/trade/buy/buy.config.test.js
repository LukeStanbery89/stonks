import buyConfig from '../../../../../server/src/trade/buy/buy.config.json';

describe('Buy Module Config', () => {
    describe('Type Checking', () => {
        test('strategy should be a string', () => {
            expect(typeof buyConfig.strategy).toBe('string');
        });
    });
});

export { };
