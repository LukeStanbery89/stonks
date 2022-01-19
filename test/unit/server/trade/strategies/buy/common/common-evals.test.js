'use strict';

import wtf from 'wtfnode';
import whyRunNodelog from 'why-is-node-running';

import CONSTANTS from '../../../../../../../server/src/constants.json';

let buyCommonEvalsModule;
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
        buyCommonEvalsModule = (await import('../../../../../../../server/src/trade/strategies/buy/common/common-evals.js')).default;
        marketCapMega = buyCommonEvalsModule.marketCapMega;
        marketCapLarge = buyCommonEvalsModule.marketCapLarge;
        marketCapLargeOrLarger = buyCommonEvalsModule.marketCapLargeOrLarger;
        marketCapLargeOrSmaller = buyCommonEvalsModule.marketCapLargeOrSmaller;
        marketCapMid = buyCommonEvalsModule.marketCapMid;
        marketCapMidOrLarger = buyCommonEvalsModule.marketCapMidOrLarger;
        marketCapMidOrSmaller = buyCommonEvalsModule.marketCapMidOrSmaller;
        marketCapSmall = buyCommonEvalsModule.marketCapSmall;
        marketCapSmallOrLarger = buyCommonEvalsModule.marketCapSmallOrLarger;
        marketCapSmallOrSmaller = buyCommonEvalsModule.marketCapSmallOrSmaller;
        marketCapMicro = buyCommonEvalsModule.marketCapMicro;
        marketCapMicroOrLarger = buyCommonEvalsModule.marketCapMicroOrLarger;
        marketCapMicroOrSmaller = buyCommonEvalsModule.marketCapMicroOrSmaller;
        marketCapNano = buyCommonEvalsModule.marketCapNano;
    });

    afterAll(async () => {
        wtf.dump();
        whyRunNodelog();
        console.log('process._getActiveHandles()', process._getActiveHandles());
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
