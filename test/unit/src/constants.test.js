import CONSTANTS from '../../../src/constants';
import safe from 'safe-regex';

describe('Constants', () => {
    test('COLORS is an object consisting entirely of hex value strings', () => {
        expect(CONSTANTS.COLORS.constructor.name).toBe('Object');
        expect(Object.values(CONSTANTS.COLORS).filter(el => typeof el !== 'string').length).toBe(0);
        Object.keys(CONSTANTS.COLORS).forEach((key) => {
            expect(CONSTANTS.COLORS[key]).toMatch(CONSTANTS.REGEX.HEX_CODE);
        });
    });

    test('MARKET_CAP_SIZES is an object consisting entirely of strings', () => {
        expect(CONSTANTS.MARKET_CAP_SIZES.constructor.name).toBe('Object');
        expect(Object.values(CONSTANTS.MARKET_CAP_SIZES).filter(el => typeof el !== 'string').length).toBe(0);
    });

    test('MARKET_CAP_SIZES match MARKET_CAP_SIZES regex', () => {
        Object.keys(CONSTANTS.MARKET_CAP_SIZES).forEach(marketCapSize => {
            expect(marketCapSize).toMatch(CONSTANTS.REGEX.MARKET_CAP_SIZES);
        });
    });

    test('MARKET_TYPES is an object consisting entirely of strings', () => {
        expect(CONSTANTS.MARKET_TYPES.constructor.name).toBe('Object');
        expect(Object.values(CONSTANTS.MARKET_TYPES).filter(el => typeof el !== 'string').length).toBe(0);
    });

    test('MARKET_TYPES match MARKET_TYPES regex', () => {
        Object.keys(CONSTANTS.MARKET_TYPES).forEach(marketType => {
            expect(marketType).toMatch(CONSTANTS.REGEX.MARKET_TYPES);
        });
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
