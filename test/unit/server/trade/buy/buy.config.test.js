'use strict';

import wtf from 'wtfnode';
import whyRunNodelog from 'why-is-node-running';

import buyConfig from '../../../../../server/src/trade/buy/buy.config.json';

describe('Buy Module Config', () => {
    afterAll(async () => {
        wtf.dump();
        whyRunNodelog();
        console.log('process._getActiveHandles()', process._getActiveHandles());
    });

    describe('Type Checking', () => {
        test('strategy is a string', () => {
            expect(typeof buyConfig.strategy).toBe('string');
        });
    });
});

export { };
