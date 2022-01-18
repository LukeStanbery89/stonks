'use strict';

import { jest } from '@jest/globals';
import CONSTANTS from '../../../../../../../server/src/constants.json';

const mockTradeConfig = {
    blacklist: [
        'BAD',
    ],
};
jest.doMock('../../../../../../../server/src/trade/trade.config.json', () => mockTradeConfig);

let omitBlacklistedSecurities;
let marketCapMega;
let marketCapLarge;
let marketCapLargeOrLarger;
let marketCapLargeOrSmaller;
let marketCapMid;
let marketCapMidOrLarger;
let marketCapMidOrSmaller;
let marketCapSmall;
let marketCapSmallOrLarger;
let marketCapSmallOrSmaller;
let marketCapMicro;
let marketCapMicroOrLarger;
let marketCapMicroOrSmaller;
let marketCapNano;

describe('Common Evaluator Functions', () => {
    beforeAll(async () => {
        const commonEvalsModule = (await import('../../../../../../../server/src/trade/buy/strategies/common/common.js')).default;
        omitBlacklistedSecurities = commonEvalsModule.omitBlacklistedSecurities;
        marketCapMega = commonEvalsModule.marketCapMega;
        marketCapLarge = commonEvalsModule.marketCapLarge;
        marketCapLargeOrLarger = commonEvalsModule.marketCapLargeOrLarger;
        marketCapLargeOrSmaller = commonEvalsModule.marketCapLargeOrSmaller;
        marketCapMid = commonEvalsModule.marketCapMid;
        marketCapMidOrLarger = commonEvalsModule.marketCapMidOrLarger;
        marketCapMidOrSmaller = commonEvalsModule.marketCapMidOrSmaller;
        marketCapSmall = commonEvalsModule.marketCapSmall;
        marketCapSmallOrLarger = commonEvalsModule.marketCapSmallOrLarger;
        marketCapSmallOrSmaller = commonEvalsModule.marketCapSmallOrSmaller;
        marketCapMicro = commonEvalsModule.marketCapMicro;
        marketCapMicroOrLarger = commonEvalsModule.marketCapMicroOrLarger;
        marketCapMicroOrSmaller = commonEvalsModule.marketCapMicroOrSmaller;
        marketCapNano = commonEvalsModule.marketCapNano;
    });

    test('omitBlacklistedSecurities() accepts any non-blacklisted securities', async () => {
        const securityData = {
            symbol: 'GOOD',
        };
        const result = await omitBlacklistedSecurities(securityData);
        expect(result).toBe(true);
    });

    test('omitBlacklistedSecurities() rejects any blacklisted securities', async () => {
        const securityData = {
            symbol: 'BAD',
        };
        const result = await omitBlacklistedSecurities(securityData);
        expect(result).toBe(false);
    });

    test('marketCapMega() only accepts securities with a MEGA-sized market cap', async () => {
        expect(await marketCapMega({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MEGA })).toBe(true);
        expect(await marketCapMega({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.LARGE })).toBe(false);
        expect(await marketCapMega({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MID })).toBe(false);
        expect(await marketCapMega({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.SMALL })).toBe(false);
        expect(await marketCapMega({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MICRO })).toBe(false);
        expect(await marketCapMega({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.NANO })).toBe(false);
    });

    test('marketCapLarge() only accepts securities with a LARGE-sized market cap', async () => {
        expect(await marketCapLarge({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MEGA })).toBe(false);
        expect(await marketCapLarge({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.LARGE })).toBe(true);
        expect(await marketCapLarge({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MID })).toBe(false);
        expect(await marketCapLarge({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.SMALL })).toBe(false);
        expect(await marketCapLarge({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MICRO })).toBe(false);
        expect(await marketCapLarge({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.NANO })).toBe(false);
    });

    test('marketCapLargeOrLarger() only accepts securities with a LARGE-sized market cap or larger', async () => {
        expect(await marketCapLargeOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MEGA })).toBe(true);
        expect(await marketCapLargeOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.LARGE })).toBe(true);
        expect(await marketCapLargeOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MID })).toBe(false);
        expect(await marketCapLargeOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.SMALL })).toBe(false);
        expect(await marketCapLargeOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MICRO })).toBe(false);
        expect(await marketCapLargeOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.NANO })).toBe(false);
    });

    test('marketCapLargeOrSmaller() only accepts securities with a LARGE-sized market cap or smaller', async () => {
        expect(await marketCapLargeOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MEGA })).toBe(false);
        expect(await marketCapLargeOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.LARGE })).toBe(true);
        expect(await marketCapLargeOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MID })).toBe(true);
        expect(await marketCapLargeOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.SMALL })).toBe(true);
        expect(await marketCapLargeOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MICRO })).toBe(true);
        expect(await marketCapLargeOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.NANO })).toBe(true);
    });

    test('marketCapMid() only accepts securities with a MID-sized market cap', async () => {
        expect(await marketCapMid({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MEGA })).toBe(false);
        expect(await marketCapMid({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.LARGE })).toBe(false);
        expect(await marketCapMid({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MID })).toBe(true);
        expect(await marketCapMid({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.SMALL })).toBe(false);
        expect(await marketCapMid({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MICRO })).toBe(false);
        expect(await marketCapMid({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.NANO })).toBe(false);
    });

    test('marketCapMidOrLarger() only accepts securities with a MID-sized market cap or larger', async () => {
        expect(await marketCapMidOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MEGA })).toBe(true);
        expect(await marketCapMidOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.LARGE })).toBe(true);
        expect(await marketCapMidOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MID })).toBe(true);
        expect(await marketCapMidOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.SMALL })).toBe(false);
        expect(await marketCapMidOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MICRO })).toBe(false);
        expect(await marketCapMidOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.NANO })).toBe(false);
    });

    test('marketCapMidOrSmaller() only accepts securities with a MID-sized market cap or smaller', async () => {
        expect(await marketCapMidOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MEGA })).toBe(false);
        expect(await marketCapMidOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.LARGE })).toBe(false);
        expect(await marketCapMidOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MID })).toBe(true);
        expect(await marketCapMidOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.SMALL })).toBe(true);
        expect(await marketCapMidOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MICRO })).toBe(true);
        expect(await marketCapMidOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.NANO })).toBe(true);
    });

    test('marketCapSmall() only accepts securities with a SMALL-sized market cap', async () => {
        expect(await marketCapSmall({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MEGA })).toBe(false);
        expect(await marketCapSmall({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.LARGE })).toBe(false);
        expect(await marketCapSmall({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MID })).toBe(false);
        expect(await marketCapSmall({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.SMALL })).toBe(true);
        expect(await marketCapSmall({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MICRO })).toBe(false);
        expect(await marketCapSmall({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.NANO })).toBe(false);
    });

    test('marketCapSmallOrLarger() only accepts securities with a SMALL-sized market cap or larger', async () => {
        expect(await marketCapSmallOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MEGA })).toBe(true);
        expect(await marketCapSmallOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.LARGE })).toBe(true);
        expect(await marketCapSmallOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MID })).toBe(true);
        expect(await marketCapSmallOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.SMALL })).toBe(true);
        expect(await marketCapSmallOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MICRO })).toBe(false);
        expect(await marketCapSmallOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.NANO })).toBe(false);
    });

    test('marketCapSmallOrSmaller() only accepts securities with a SMALL-sized market cap or smaller', async () => {
        expect(await marketCapSmallOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MEGA })).toBe(false);
        expect(await marketCapSmallOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.LARGE })).toBe(false);
        expect(await marketCapSmallOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MID })).toBe(false);
        expect(await marketCapSmallOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.SMALL })).toBe(true);
        expect(await marketCapSmallOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MICRO })).toBe(true);
        expect(await marketCapSmallOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.NANO })).toBe(true);
    });

    test('marketCapMicro() only accepts securities with a MICRO-sized market cap', async () => {
        expect(await marketCapMicro({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MEGA })).toBe(false);
        expect(await marketCapMicro({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.LARGE })).toBe(false);
        expect(await marketCapMicro({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MID })).toBe(false);
        expect(await marketCapMicro({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.SMALL })).toBe(false);
        expect(await marketCapMicro({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MICRO })).toBe(true);
        expect(await marketCapMicro({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.NANO })).toBe(false);
    });

    test('marketCapMicroOrLarger() only accepts securities with a MICRO-sized market cap or larger', async () => {
        expect(await marketCapMicroOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MEGA })).toBe(true);
        expect(await marketCapMicroOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.LARGE })).toBe(true);
        expect(await marketCapMicroOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MID })).toBe(true);
        expect(await marketCapMicroOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.SMALL })).toBe(true);
        expect(await marketCapMicroOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MICRO })).toBe(true);
        expect(await marketCapMicroOrLarger({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.NANO })).toBe(false);
    });

    test('marketCapMicroOrSmaller() only accepts securities with a MICRO-sized market cap or smaller', async () => {
        expect(await marketCapMicroOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MEGA })).toBe(false);
        expect(await marketCapMicroOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.LARGE })).toBe(false);
        expect(await marketCapMicroOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MID })).toBe(false);
        expect(await marketCapMicroOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.SMALL })).toBe(false);
        expect(await marketCapMicroOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MICRO })).toBe(true);
        expect(await marketCapMicroOrSmaller({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.NANO })).toBe(true);
    });

    test('marketCapNano() only accepts securities with a NANO-sized market cap', async () => {
        expect(await marketCapNano({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MEGA })).toBe(false);
        expect(await marketCapNano({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.LARGE })).toBe(false);
        expect(await marketCapNano({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MID })).toBe(false);
        expect(await marketCapNano({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.SMALL })).toBe(false);
        expect(await marketCapNano({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.MICRO })).toBe(false);
        expect(await marketCapNano({ marketCapSize: CONSTANTS.MARKET_CAP_SIZES.NANO })).toBe(true);
    });
});
