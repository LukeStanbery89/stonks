/* istanbul ignore file */

export const test = function () {
    return new Promise(resolve => {
        console.log('===== STRATEGY ONE =====');
        resolve(true);
    });
};

export default {
    orderType: 'market',
    evalFunctions: [
        test,
    ],
};
