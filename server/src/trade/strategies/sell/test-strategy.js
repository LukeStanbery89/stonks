'use strict';

export const omitThreeCharacterSymbols = function (securityData) {
    return new Promise(resolve => {
        return resolve(securityData.symbol.length !== 3);
    });
};

export const stockPriceRose10PercentOrMore = function (securityData) {
    return new Promise(resolve => {
        return resolve(false);
    });
};

export const stockPriceDropped2PercentOrMore = function (securityData) {
    return new Promise(resolve => {
        return resolve(true);
    });
};

export const stockPriceMovedEnoughToSell = async function (securityData) {
    return await stockPriceRose10PercentOrMore(securityData)
        || await stockPriceDropped2PercentOrMore(securityData);
};

// NOTE: Do not alphabetize!!! Functions will be executed in this order.
export default [
    omitThreeCharacterSymbols,
    stockPriceMovedEnoughToSell,
];
