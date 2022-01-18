import sellConfig from '../../../../../server/src/trade/sell/sell.config.json';

describe('Buy Module Config', () => {
    describe('Type Checking', () => {
        test('conditions is an array of objects', () => {
            expect(sellConfig.conditions.constructor.name).toBe('Array');
            expect(Object.values(sellConfig.conditions).filter(el => typeof el !== 'string').length).toBe(0);
        });
    });
});

export { };
