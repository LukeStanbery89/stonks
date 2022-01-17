import tradeConfig from '../trade.config.json';

export function userHasAvailableBalance(securityData) {
    return new Promise(resolve => {
        // TODO
        console.log('userHasAvailableBalance: ', securityData.symbol);
        return resolve(true);
    });
}

export function omitBlacklistedSecurities(securityData) {
    return new Promise(resolve => {
        console.log('omitBlacklistedSecurities: ', securityData.symbol);
        return resolve(!tradeConfig.blacklist.includes(securityData.symbol));
    });
}

// Mega = >$200 billion
export function marketCapMega(securityData) {
    return new Promise(resolve => {
        console.log('marketCapMega: ', securityData.symbol);
        return resolve(securityData.marketCapSize === tradeConfig.marketCapSizes.MEGA);
    });
}

// Large = $10 billion - $200 billion
export function marketCapLarge(securityData) {
    return new Promise(resolve => {
        console.log('marketCapLarge: ', securityData.symbol);
        return resolve(securityData.marketCapSize === tradeConfig.marketCapSizes.LARGE);
    });
}

// Mid = $2 billion - $10 billion
export function marketCapMid(securityData) {
    return new Promise(resolve => {
        console.log('marketCapMid: ', securityData.symbol);
        return resolve(securityData.marketCapSize === tradeConfig.marketCapSizes.MID);
    });
}

// Small = $300 million - $2 billion
export function marketCapSmall(securityData) {
    return new Promise(resolve => {
        console.log('marketCapSmall: ', securityData.symbol);
        return resolve(securityData.marketCapSize === tradeConfig.marketCapSizes.SMALL);
    });
}

// Micro = $50 million - $300 million
export function marketCapMicro(securityData) {
    return new Promise(resolve => {
        console.log('marketCapMicro: ', securityData.symbol);
        return resolve(securityData.marketCapSize === tradeConfig.marketCapSizes.MICRO);
    });
}

// Nano = <$50 million
export function marketCapNano(securityData) {
    return new Promise(resolve => {
        console.log('marketCapNano: ', securityData.symbol);
        return resolve(securityData.marketCapSize === tradeConfig.marketCapSizes.NANO);
    });
}
