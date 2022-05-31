/* istanbul ignore file */

import constants from '../../../constants';

export const test = function () {
    return new Promise(resolve => {
        console.log('===== STRATEGY ONE =====');
        resolve(true);
    });
};

export default {
    marketType: constants.MARKET_TYPES.CRYPTO,
    orderType: 'market',
    evalFunctions: [
        test,
    ],
};
