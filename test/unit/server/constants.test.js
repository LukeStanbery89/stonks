import CONSTANTS from '../../../server/src/constants';
import safe from 'safe-regex';

describe('Constants', () => {
    test('MARKET_CAP_SIZES is an object consisting entirely of strings', () => {
        expect(CONSTANTS.MARKET_CAP_SIZES.constructor.name).toBe('Object');
        expect(Object.values(CONSTANTS.MARKET_CAP_SIZES).filter(el => typeof el !== 'string').length).toBe(0);
    });

    test('REGEX is an object consisting of RegEx patterns', () => {
        expect(CONSTANTS.REGEX.constructor.name).toBe('Object');
        expect(Object.values(CONSTANTS.REGEX).filter(el => el.constructor.name !== 'RegExp').length).toBe(0);
    });

    test('REGEX patterns are not susceptible to ReDos attacks', () => {
        Object.keys(CONSTANTS.REGEX).forEach(key => {
            expect(safe(CONSTANTS.REGEX[key])).toBe(true);
        });
    });

    test('TRADE_UNIT_TYPES is an object consisting entirely of strings', () => {
        expect(CONSTANTS.TRADE_UNIT_TYPES.constructor.name).toBe('Object');
        expect(Object.values(CONSTANTS.TRADE_UNIT_TYPES).filter(el => typeof el !== 'string').length).toBe(0);
    });
});
