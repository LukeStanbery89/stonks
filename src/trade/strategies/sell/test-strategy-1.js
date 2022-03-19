/* istanbul ignore file */

export const test1 = function () {
    return new Promise(resolve => {
        console.log('===== STRATEGY TWO =====');
        resolve(true);
    });
};

export default {
    orderType: 'market',
    evalFunctions: [
        test1,
    ],
};
