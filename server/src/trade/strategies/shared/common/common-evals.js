import tradeConfig from '../../../trade.config.js';

export function omitBlacklistedSecurities(securityData) {
    return new Promise(resolve => {
        return resolve(!tradeConfig.blacklist.includes(securityData.symbol));
    });
}
