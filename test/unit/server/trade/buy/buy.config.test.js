import buyConfig from '../../../../../server/src/trade/buy/buy.config.json';

describe('Buy Module Config', () => {
    describe('Type Checking', () => {
        test('strategy is a string', () => {
            expect(typeof buyConfig.strategy).toBe('string');
        });
    });
});

export { };
