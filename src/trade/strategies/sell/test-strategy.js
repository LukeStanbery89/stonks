/* istanbul ignore file */

export const test = function () {
    return new Promise(resolve => {
        console.log('===== STRATEGY ONE =====');
        return resolve(true);
    });
};

export default {
    orderType: 'market',
    evalFunctions: [
        test,
    ],
};
