'use strict';

import wtf from 'wtfnode';
import whyRunNodelog from 'why-is-node-running';

import { run } from '../../../../../server/src/trade/buy/buy';

describe('Buy module', () => {
    afterAll(async () => {
        wtf.dump();
        whyRunNodelog();
        console.log('process._getActiveHandles()', process._getActiveHandles());
    });

    describe('buySymbols()', () => {
        test('DUMMY TEST', async () => {
            // FIXME
            expect(true).toBeTruthy();
            // await buySymbols();
        });
    });

    describe('getBuyableSymbols()', () => {
        // TODO
    });

    describe('buy()', () => {
        // TODO
    });
});

export { };
