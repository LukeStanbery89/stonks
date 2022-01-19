import sellConfig from '../../../../../server/src/trade/sell/sell.config.json';

describe('Buy Module Config', () => {
    describe('Type Checking', () => {
        test('strategy is a string', () => {
            expect(typeof sellConfig.strategy).toBe('string');
        });
    });
});

export { };
