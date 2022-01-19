'use strict';

import wtf from 'wtfnode';
import whyRunNodelog from 'why-is-node-running';

import sellConfig from '../../../../../server/src/trade/sell/sell.config.json';

describe('Buy Module Config', () => {
    afterAll(async () => {
        wtf.dump();
        whyRunNodelog();
        console.log('process._getActiveHandles()', process._getActiveHandles());
    });

    describe('Type Checking', () => {
        test('strategy is a string', () => {
            expect(typeof sellConfig.strategy).toBe('string');
        });
    });
});

export { };
