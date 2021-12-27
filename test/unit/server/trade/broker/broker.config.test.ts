import { JSObject } from "../../../../../server/src/types";

const brokerConfig: JSObject = require('../../../../../server/src/trade/broker/broker.config.json');

describe('Broker Config', () => {
    it('COMMANDS is an object consisting entirely of strings', () => {
        expect(brokerConfig.COMMANDS.constructor.name).toBe('Object');
        expect(Object.values(brokerConfig.COMMANDS).filter(el => typeof el !== 'string').length).toBe(0);
    });
});