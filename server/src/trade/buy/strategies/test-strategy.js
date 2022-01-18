'use strict';

import { marketCapSmallOrLarger } from "./common/common-evals.js";

export const omitApple = function (securityData) {
    return new Promise(resolve => {
        return resolve(securityData.symbol !== 'AAPL');
    });
};

// NOTE: Do not alphabetize!!! Functions will be executed in this order.
export default [
    omitApple,
    marketCapSmallOrLarger,
];
