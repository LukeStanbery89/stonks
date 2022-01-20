import tradeConfig from '../../../trade.config.json';

export function omitBlacklistedSecurities(securityData) {
    return new Promise(resolve => {
        return resolve(!tradeConfig.blacklist.includes(securityData.symbol));
    });
}
