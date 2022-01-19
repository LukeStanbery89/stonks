'use strict';

import wtf from 'wtfnode';
import whyRunNodelog from 'why-is-node-running';

import brokerConfig from '../../../../../server/src/trade/broker/broker.config.json';

describe('Broker Config', () => {
    afterAll(async () => {
        wtf.dump();
        whyRunNodelog();
        console.log('process._getActiveHandles()', process._getActiveHandles());
    });

    test('commands is an object consisting entirely of strings', () => {
        expect(brokerConfig.commands.constructor.name).toBe('Object');
        expect(Object.values(brokerConfig.commands).filter(el => typeof el !== 'string').length).toBe(0);
    });
});

export { };
