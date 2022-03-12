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
