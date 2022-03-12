import tradeConfig from '../../trade.config.js';

export function omitBlacklistedSecurities(securityData) {
    return new Promise(resolve => {
        return resolve(!tradeConfig.blacklist.includes(securityData.symbol));
    });
}

export function noOpenOrder(securityData, processingContext) {
    return new Promise(resolve => {
        return resolve(processingContext.orders.filter(order => {
            return order.symbol === securityData.symbol;
        }).length === 0);
    });
}

export function noOpenBuyOrder(securityData, processingContext) {
    return new Promise(resolve => {
        return resolve(processingContext?.orders?.filter(order => {
            return order.symbol === securityData.symbol
                && order.side.toLowerCase() === 'buy';
        }).length === 0);
    });
}

export function noOpenSellOrder(securityData, processingContext) {
    return new Promise(resolve => {
        return resolve(processingContext?.orders?.filter(order => {
            return order.symbol === securityData.symbol
                && order.side.toLowerCase() === 'sell';
        }).length === 0);
    });
}

export function securityNotTradedToday(securityData, processingContext) {
    return new Promise(resolve => {
        const tradesToday = processingContext.accountActivityToday.filter(activity => {
            return activity.symbol === securityData.symbol;
        });
        return resolve(tradesToday.length === 0);
    });
}
