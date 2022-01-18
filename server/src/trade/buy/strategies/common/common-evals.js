import tradeConfig from '../../../trade.config.json';
import CONSTANTS from '../../../../constants.json';

export function omitBlacklistedSecurities(securityData) {
    return new Promise(resolve => {
        return resolve(!tradeConfig.blacklist.includes(securityData.symbol));
    });
}

// MEGA = >$200 billion
export function marketCapMega(securityData) {
    return new Promise(resolve => {
        return resolve(securityData.marketCapSize === CONSTANTS.MARKET_CAP_SIZES.MEGA);
    });
}

// LARGE = $10 billion - $200 billion
export function marketCapLarge(securityData) {
    return new Promise(resolve => {
        return resolve(securityData.marketCapSize === CONSTANTS.MARKET_CAP_SIZES.LARGE);
    });
}

export function marketCapLargeOrLarger(securityData) {
    return new Promise(resolve => {
        return resolve([
            CONSTANTS.MARKET_CAP_SIZES.MEGA,
            CONSTANTS.MARKET_CAP_SIZES.LARGE,
        ].includes(securityData.marketCapSize));
    });
}

export function marketCapLargeOrSmaller(securityData) {
    return new Promise(resolve => {
        return resolve([
            CONSTANTS.MARKET_CAP_SIZES.LARGE,
            CONSTANTS.MARKET_CAP_SIZES.MID,
            CONSTANTS.MARKET_CAP_SIZES.SMALL,
            CONSTANTS.MARKET_CAP_SIZES.MICRO,
            CONSTANTS.MARKET_CAP_SIZES.NANO,
        ].includes(securityData.marketCapSize));
    });
}

// MID = $2 billion - $10 billion
export function marketCapMid(securityData) {
    return new Promise(resolve => {
        return resolve(securityData.marketCapSize === CONSTANTS.MARKET_CAP_SIZES.MID);
    });
}

export function marketCapMidOrLarger(securityData) {
    return new Promise(resolve => {
        return resolve([
            CONSTANTS.MARKET_CAP_SIZES.MEGA,
            CONSTANTS.MARKET_CAP_SIZES.LARGE,
            CONSTANTS.MARKET_CAP_SIZES.MID,
        ].includes(securityData.marketCapSize));
    });
}

export function marketCapMidOrSmaller(securityData) {
    return new Promise(resolve => {
        return resolve([
            CONSTANTS.MARKET_CAP_SIZES.MID,
            CONSTANTS.MARKET_CAP_SIZES.SMALL,
            CONSTANTS.MARKET_CAP_SIZES.MICRO,
            CONSTANTS.MARKET_CAP_SIZES.NANO,
        ].includes(securityData.marketCapSize));
    });
}

// SMALL = $300 million - $2 billion
export function marketCapSmall(securityData) {
    return new Promise(resolve => {
        return resolve(securityData.marketCapSize === CONSTANTS.MARKET_CAP_SIZES.SMALL);
    });
}

export function marketCapSmallOrLarger(securityData) {
    return new Promise(resolve => {
        return resolve([
            CONSTANTS.MARKET_CAP_SIZES.MEGA,
            CONSTANTS.MARKET_CAP_SIZES.LARGE,
            CONSTANTS.MARKET_CAP_SIZES.MID,
            CONSTANTS.MARKET_CAP_SIZES.SMALL,
        ].includes(securityData.marketCapSize));
    });
}

export function marketCapSmallOrSmaller(securityData) {
    return new Promise(resolve => {
        return resolve([
            CONSTANTS.MARKET_CAP_SIZES.SMALL,
            CONSTANTS.MARKET_CAP_SIZES.MICRO,
            CONSTANTS.MARKET_CAP_SIZES.NANO,
        ].includes(securityData.marketCapSize));
    });
}

// MICRO = $50 million - $300 million
export function marketCapMicro(securityData) {
    return new Promise(resolve => {
        return resolve(securityData.marketCapSize === CONSTANTS.MARKET_CAP_SIZES.MICRO);
    });
}

export function marketCapMicroOrLarger(securityData) {
    return new Promise(resolve => {
        return resolve([
            CONSTANTS.MARKET_CAP_SIZES.MEGA,
            CONSTANTS.MARKET_CAP_SIZES.LARGE,
            CONSTANTS.MARKET_CAP_SIZES.MID,
            CONSTANTS.MARKET_CAP_SIZES.SMALL,
            CONSTANTS.MARKET_CAP_SIZES.MICRO,
        ].includes(securityData.marketCapSize));
    });
}

export function marketCapMicroOrSmaller(securityData) {
    return new Promise(resolve => {
        return resolve([
            CONSTANTS.MARKET_CAP_SIZES.MICRO,
            CONSTANTS.MARKET_CAP_SIZES.NANO,
        ].includes(securityData.marketCapSize));
    });
}

// NANO = <$50 million
export function marketCapNano(securityData) {
    return new Promise(resolve => {
        return resolve(securityData.marketCapSize === CONSTANTS.MARKET_CAP_SIZES.NANO);
    });
}
