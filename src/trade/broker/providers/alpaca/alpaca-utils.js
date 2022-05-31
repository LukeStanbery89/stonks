import alpacaConfig from './alpaca.config';
import tradeConfig from '../../../trade.config';
import constants from '../../../../constants';

export function getAlpacaHeaders() {
    return {
        'APCA-API-KEY-ID': process.env.ALPACA_API_KEY,
        'APCA-API-SECRET-KEY': process.env.ALPACA_API_SECRET,
    };
}

export function getAlpacaBaseUrl() {
    switch (process.env.ENV) {
        case 'production':
            return alpacaConfig.liveApiBaseUrl;
        default:
            return alpacaConfig.testApiBaseUrl;
    }
}

export function convertBuySellOrderToAlpacaRequest(order) {
    let alpacaOrder = {
        symbol: order.symbol,
        side: order.side,
        type: order.type,
        time_in_force: tradeConfig.timeInForce,
    };

    // TODO: Move this logic into the Order class
    // TODO: For sell orders, we probably want to sell everything we
    // own, rather than reading from the config.
    switch (tradeConfig.tradeUnit) {
        case constants.TRADE_UNIT_TYPES.SHARES:
            alpacaOrder.qty = order.qty || tradeConfig.tradeQty;
            break;
        case constants.TRADE_UNIT_TYPES.DOLLARS:
            alpacaOrder.notional = order.notional || tradeConfig.tradeAmount;
            break;
    }

    return alpacaOrder;
}

export function logError(...params) {
    let prefix;
    let error;
    if (params.length > 1) {
        prefix = `[${params[0]}]`;
        error = params[1];
    } else {
        prefix = '[ERROR]';
        error = params;
    }

    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(prefix, JSON.stringify(error.response));
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(prefix, JSON.stringify(error.request));
    } else if (error.message) {
        console.error(prefix, error.message);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error(prefix, error);
    }
    if (error.config) {
        console.error(prefix, error.config);
    }
}