'use strict';

import { marketCapSmallOrLarger } from "./common/common";

export const first = function (securityData) {
    return new Promise(resolve => {
        return resolve(true);
    });
};

export const omitMicrosoft = function (securityData) {
    return new Promise(resolve => {
        return resolve(securityData.symbol !== 'MSFT');
    });
};

export const third = function (securityData) {
    return new Promise(resolve => {
        return resolve(true);
    });
};

// NOTE: Do not alphabetize!!! Functions will be executed in this order.
export default [
    first,
    omitMicrosoft,
    third,
    marketCapSmallOrLarger,
];
