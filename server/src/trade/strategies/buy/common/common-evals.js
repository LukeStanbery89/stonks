'use strict';

import CONSTANTS from '../../../../constants.json';
import Broker from '../../../broker/Broker.js';
const broker = new Broker();

export function securityIsNotAlreadyOwned(securityData) {
    return new Promise(resolve => {
        broker.getPosition(securityData.symbol).then(position => {
            return resolve(!(position));
        });
    });
}

export function noOpenOrder(securityData, aggregate) {
    return new Promise(resolve => {
        return resolve(aggregate?.orders?.filter(order => {
            return order.symbol === securityData.symbol;
        }).length === 0);
    });
}

/**
 * MARKET CAP CLASSIFICATIONS
 * 
 * MEGA = >$200 billion
 * LARGE = $10 billion - $200 billion
 * MID = $2 billion - $10 billion
 * SMALL = $300 million - $2 billion
 * MICRO = $50 million - $300 million
 * NANO = <$50 million
 */

export function marketCapMega(securityData) {
    return new Promise(resolve => {
        return resolve(securityData.marketCapSize === CONSTANTS.MARKET_CAP_SIZES.MEGA);
    });
}

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

export function marketCapNano(securityData) {
    return new Promise(resolve => {
        return resolve(securityData.marketCapSize === CONSTANTS.MARKET_CAP_SIZES.NANO);
    });
}
