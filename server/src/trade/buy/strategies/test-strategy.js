'use strict';

import { marketCapMega } from "../common-evals";

export const first = function (securityData) {
    return new Promise(resolve => {
        console.log('firstPass: ', securityData.symbol);
        return resolve(true);
    });
};

export const omitMicrosoft = function (securityData) {
    return new Promise(resolve => {
        console.log('secondFail: ', securityData.symbol);
        return resolve(securityData.symbol !== 'MSFT');
    });
};

export const third = function (securityData) {
    return new Promise(resolve => {
        console.log('secondFail: ', securityData.symbol);
        return resolve(true);
    });
};

// NOTE: Do not alphabetize!!! Functions will be executed in this order.
export default [
    first,
    omitMicrosoft,
    third,
    marketCapMega,
];
