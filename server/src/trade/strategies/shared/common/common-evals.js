import tradeConfig from '../../../trade.config.js';

export function omitBlacklistedSecurities(securityData) {
    return new Promise(resolve => {
        return resolve(!tradeConfig.blacklist.includes(securityData.symbol));
    });
}

export function noOpenOrder(securityData, aggregate) {
    return new Promise(resolve => {
        return resolve(aggregate?.orders?.filter(order => {
            return order.symbol === securityData.symbol;
        }).length === 0);
    });
}

export function noOpenBuyOrder(securityData, aggregate) {
    return new Promise(resolve => {
        return resolve(aggregate?.orders?.filter(order => {
            return order.symbol === securityData.symbol
                && order.side.toLowerCase() === 'buy';
        }).length === 0);
    });
}

export function noOpenSellOrder(securityData, aggregate) {
    return new Promise(resolve => {
        return resolve(aggregate?.orders?.filter(order => {
            return order.symbol === securityData.symbol
                && order.side.toLowerCase() === 'sell';
        }).length === 0);
    });
}
