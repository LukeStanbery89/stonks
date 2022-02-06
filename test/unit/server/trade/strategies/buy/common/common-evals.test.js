import CONSTANTS from '../../../../../../../server/src/constants.json';
import {
    marketCapMega,
    marketCapLarge,
    marketCapLargeOrLarger,
    marketCapLargeOrSmaller,
    marketCapMicro,
    marketCapMicroOrLarger,
    marketCapMicroOrSmaller,
    marketCapMid,
    marketCapMidOrLarger,
    marketCapMidOrSmaller,
    marketCapSmall,
    marketCapSmallOrLarger,
    marketCapSmallOrSmaller,
    marketCapNano,
} from '../../../../../../../server/src/trade/strategies/buy/common/common-evals.js';

describe('Common Evaluator Functions', () => {
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
