'use strict';

import wtf from 'wtfnode';
import whyRunNodelog from 'why-is-node-running';

import { run } from '../../../../../server/src/trade/sell/sell';

describe('Sell module', () => {
    afterAll(async () => {
        wtf.dump();
        whyRunNodelog();
        console.log('process._getActiveHandles()', process._getActiveHandles());
    });

    describe('sellPositions()', () => {
        test('DUMMY TEST', () => {
            // FIXME
            expect(true).toBeTruthy();
        });
    });

    describe('getPositions()', () => {
        // TODO
    });

    describe('isPositionSellable()', () => {
        // TODO
    });

    describe('sellPosition()', () => {
        // TODO
    });
});

export { };
