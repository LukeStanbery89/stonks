/* istanbul ignore file */

export const omitThreeCharacterSymbols = function (securityData) {
    return new Promise(resolve => {
        return resolve(securityData.symbol.length !== 3);
    });
};

export const stockPriceRose10PercentOrMore = function () {
    return new Promise(resolve => {
        return resolve(false);
    });
};

export const stockPriceDropped2PercentOrMore = function () {
    return new Promise(resolve => {
        return resolve(true);
    });
};

export const stockPriceMovedEnoughToSell = async function (securityData) {
    return await stockPriceRose10PercentOrMore(securityData)
        || await stockPriceDropped2PercentOrMore(securityData);
};

export default {
    orderType: 'market',
    evalFunctions: [
        omitThreeCharacterSymbols,
        stockPriceMovedEnoughToSell,
    ],
};
