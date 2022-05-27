/* istanbul ignore file */

import constants from '../../../constants';

export const test1 = function () {
    return new Promise(resolve => {
        console.log('===== STRATEGY TWO =====');
        resolve(true);
    });
};

export default {
    marketType: constants.MARKET_TYPES.CRYPTO,
    orderType: 'market',
    evalFunctions: [
        test1,
    ],
};
