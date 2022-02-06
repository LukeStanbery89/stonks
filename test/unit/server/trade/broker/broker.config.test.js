import brokerConfig from '../../../../../server/src/trade/broker/broker.config.js';

describe('Broker Config', () => {
    test('commands is an object consisting entirely of strings', () => {
        expect(brokerConfig.commands.constructor.name).toBe('Object');
        expect(Object.values(brokerConfig.commands).filter(el => typeof el !== 'string').length).toBe(0);
    });
});

export { };
