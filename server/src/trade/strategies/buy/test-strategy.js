'use strict';

import { marketCapSmallOrLarger, noOpenOrder } from './common/common-evals.js';

export const first = function () {
    return new Promise(resolve => {
        resolve(true);
    });
};

export const omitApple = function (securityData) {
    return new Promise(resolve => {
        return resolve(securityData.symbol !== 'AAPL');
    });
};

export const third = function () {
    return new Promise(resolve => {
        resolve(true);
    });
};

// NOTE: Do not alphabetize!!! Functions will be executed in this order.
export default [
    first,
    omitApple,
    third,
    noOpenOrder,
    marketCapSmallOrLarger,
];
