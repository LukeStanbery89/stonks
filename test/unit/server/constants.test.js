'use strict';

import CONSTANTS from '../../../server/src/constants.json';

describe('constants.json', () => {
    test('MARKET_CAP_SIZES is an object consisting entirely of strings', () => {
        expect(CONSTANTS.MARKET_CAP_SIZES.constructor.name).toBe('Object');
        expect(Object.values(CONSTANTS.MARKET_CAP_SIZES).filter(el => typeof el !== 'string').length).toBe(0);
    });

    test('TRADE_UNIT_TYPES is an object consisting entirely of strings', () => {
        expect(CONSTANTS.TRADE_UNIT_TYPES.constructor.name).toBe('Object');
        expect(Object.values(CONSTANTS.TRADE_UNIT_TYPES).filter(el => typeof el !== 'string').length).toBe(0);
    });
});
