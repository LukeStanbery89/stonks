import axios from 'axios';
import tradeConfig from '../../../trade.config.js';
import alpacaConfig from './alpaca.config.js';
const BROKER = 'ALPACA';

const buy = (buyOrder) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            baseURL: getAlpacaBaseUrl(),
            url: '/v2/orders',
            headers: getAlpacaHeaders(),
            data: {
                symbol: buyOrder.symbol,
                qty: buyOrder.qty,
                // notional: buyOrder.notional, // TODO: Implement full share/fractional share toggle
                side: 'buy',
                type: tradeConfig.orderType,
                time_in_force: tradeConfig.timeInForce,
            },
        }).then((response) => {
            if (response.status === 200) {
                const result = {
                    requestId: response.data.id,
                    symbol: response.data.symbol,
                    notional: parseFloat(response.data.notional),
                    qty: parseFloat(response.data.qty),
                    securityPrice: 0.00, // TODO Figure out where to get this from
                    broker: BROKER,
                    statusCode: response.status,
                    statusText: response.data.status,
                    timestamp: response.data.submitted_at,
                    response,
                };
                return resolve(result);
            }
            throw new Error(`Buy order failed with error: ${response.status} - ${response.statusText}`);
        }).catch((error) => {
            return reject(error);
        });
    });
};

const sell = (sellOrder) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            baseURL: getAlpacaBaseUrl(),
            url: '/v2/orders',
            headers: getAlpacaHeaders(),
            data: {
                symbol: sellOrder.symbol,
                qty: sellOrder.qty, // TODO: Implement full share/fractional share toggle
                // notional: sellOrder.notional,
                side: 'sell',
                type: tradeConfig.orderType,
                time_in_force: tradeConfig.timeInForce,
            },
        }).then((response) => {
            if (response.status === 200) {
                return resolve({
                    requestId: response.data.id,
                    symbol: response.data.symbol,
                    notional: parseFloat(response.data.notional),
                    qty: parseFloat(response.data.qty),
                    securityPrice: 0.00, // TODO Figure out where to get this from
                    broker: BROKER,
                    statusCode: response.status,
                    statusText: response.data.status,
                    timestamp: response.data.filled_at,
                    response,
                });
            }
            throw new Error(`Sell order failed with error: ${response.status} - ${response.statusText}`);
        }).catch((error) => {
            return reject(error);
        });
    });
};

const getPositions = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            baseURL: getAlpacaBaseUrl(),
            url: '/v2/positions',
            headers: getAlpacaHeaders(),
        }).then((response) => {
            if (response.status === 200) {
                return resolve(response.data.map((position) => {
                    return {
                        id: position.asset_id,
                        symbol: position.symbol,
                        qty: parseFloat(position.qty),
                        marketValue: position.market_value,
                        currentPrice: position.current_price,
                        lastDayPrice: position.lastday_price,
                        broker: BROKER,
                        response,
                    };
                }));
            }
            throw new Error(`Buy order failed with error: ${response.status} - ${response.statusText}`);
        }).catch((error) => {
            return reject(error);
        });
    });
};

const getPosition = (symbol) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            baseURL: getAlpacaBaseUrl(),
            url: `/v2/positions/${symbol}`,
            headers: getAlpacaHeaders(),
        }).then((response) => {
            if (response.status === 200) {
                return resolve({
                    id: response.data.asset_id,
                    symbol: response.data.symbol,
                    qty: parseFloat(response.data.qty),
                    marketValue: response.data.market_value,
                    currentPrice: response.data.current_price,
                    lastDayPrice: response.data.lastday_price,
                    broker: BROKER,
                    response,
                });
            }
            throw new Error(`Buy order failed with error: ${response.status} - ${response.statusText}`);
        }).catch((error) => {
            if (error.response && error.response.status === 404) {
                return resolve(null);
            }
            return reject(error);
        });
    });
};

const getAccountInfo = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            baseURL: getAlpacaBaseUrl(),
            url: '/v2/account',
            headers: getAlpacaHeaders(),
        }).then((response) => {
            if (response.status === 200) {
                return resolve({
                    accountNumber: response.data.account_number,
                    broker: BROKER,
                    funds: response.data.equity, // TODO: Make sure we're using the correct value here
                    patternDayTrader: response.data.pattern_day_trader,
                    response,
                });
            }
            throw new Error(`Buy order failed with error: ${response.status} - ${response.statusText}`);
        }).catch((error) => {
            return reject(error);
        });
    });
};

const getOrders = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            baseURL: getAlpacaBaseUrl(),
            url: '/v2/orders',
            headers: getAlpacaHeaders(),
            data: {
                status: params?.status || '', // default = "open"
                symbols: params?.symbol ? params.symbol.join(',') : '',
            },
        }).then((response) => {
            if (response.status === 200) {
                return resolve(response.data.map(order => {
                    return {
                        broker: BROKER,
                        orderId: order.id,
                        submittedAt: order.submitted_at,
                        symbol: order.symbol,
                        notional: parseFloat(order.notional),
                        qty: order.qty,
                        type: order.type,
                        side: order.side,
                    };
                }));
            }
            throw new Error(`Failed to retrieve orders with error: ${response.status} - ${response.statusText}`);
        }).catch((error) => {
            return reject(error);
        });
    });
};

const getSecurities = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            baseURL: getAlpacaBaseUrl(),
            url: '/v2/assets?status=active', // Only get active securities
            headers: getAlpacaHeaders(),
        }).then((response) => {
            if (response.status === 200) {
                return resolve(response.data);
            }
            throw new Error(`Buy order failed with error: ${response.status} - ${response.statusText}`);
        }).catch((error) => {
            return reject(error);
        });
    });
};

const getAlpacaHeaders = () => {
    return {
        'APCA-API-KEY-ID': process.env.ALPACA_API_KEY,
        'APCA-API-SECRET-KEY': process.env.ALPACA_API_SECRET,
    };
};

const getAlpacaBaseUrl = () => {
    switch (process.env.ENV) {
        case 'production':
            return alpacaConfig.liveApiBaseUrl;
        default:
            return alpacaConfig.testApiBaseUrl;
    }
};

export {
    buy,
    sell,
    getAccountInfo,
    getPositions,
    getPosition,
    getOrders,
    getSecurities,
};
