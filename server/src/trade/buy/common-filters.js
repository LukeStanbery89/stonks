function userHasAvailableBalance(symbol) {
    return new Promise((resolve, reject) => {
        // TODO
        console.log('userHasAvailableBalance');
        resolve(symbol);
    });
}

function filterMarketCap(symbol) {
    return new Promise((resolve, reject) => {
        // TODO
        console.log('filterMarketCap');
        resolve(symbol);
    });
}

export default [
    userHasAvailableBalance,
    filterMarketCap,
];
