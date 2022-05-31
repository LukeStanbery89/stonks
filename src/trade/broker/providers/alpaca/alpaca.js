import axios from 'axios';
import { logVerbose } from '../../../../app-utils.js';
import { convertBuySellOrderToAlpacaRequest, getAlpacaBaseUrl, getAlpacaHeaders, logError } from './alpaca-utils.js';
const BROKER = 'ALPACA';

const buy = (buyOrder) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            baseURL: getAlpacaBaseUrl(),
            url: '/v2/orders',
            headers: getAlpacaHeaders(),
            data: convertBuySellOrderToAlpacaRequest(buyOrder),
        }).then((response) => {
            if (response.status === 200) {
                logVerbose('ALPACA.BUY: ', response.data);
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
            logError('ALPACA.buy.ERROR', error);
            return reject(error);
        });
    });
};

const sell = (sellOrder) => {
    logVerbose('sellOrder: ', sellOrder);
    const data = convertBuySellOrderToAlpacaRequest(sellOrder);
    logVerbose('sellOrder -> Alpaca Request: ', data);
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            baseURL: getAlpacaBaseUrl(),
            url: '/v2/orders',
            headers: getAlpacaHeaders(),
            data,
        }).then((response) => {
            if (response.status === 200) {
                logVerbose('ALPACA.SELL: ', response.data);
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
            logError('ALPACA.sell.ERROR', error);
            return reject(error);
        });
    });
};

const liquidatePosition = (symbol) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'DELETE',
            baseURL: getAlpacaBaseUrl(),
            url: `/v2/positions/${symbol}`,
            headers: getAlpacaHeaders(),
        }).then((response) => {
            if (response.status === 200) {
                logVerbose('ALPACA.LIQUIDATE_POSITION: ', response.data);
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
            throw new Error(`Liquidate position order failed with error: ${response.status} - ${response.statusText}`);
        }).catch((error) => {
            logError('ALPACA.liquidatePosition.ERROR', error);
            return reject(error);
        });
    });
};

const getPositions = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            baseURL: getAlpacaBaseUrl(),
            url: '/v2/positions?asset_class=us_equity', // Ignore crypto
            headers: getAlpacaHeaders(),
        }).then((response) => {
            if (response.status === 200) {
                logVerbose('ALPACA.GET_POSITIONS: ', response.data);
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
            logError('ALPACA.getPositions.ERROR', error);
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
                logVerbose('ALPACA.GET_POSITION: ', response.data);
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
            logError('ALPACA.getPosition.ERROR', error);
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
                logVerbose('ALPACA.GET_ACCOUNT_INFO: ', response.data);
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
            logError('ALPACA.getAccountInfo.ERROR', error);
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
                logVerbose('ALPACA.GET_ORDERS: ', response.data);
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
            logError('ALPACA.getOrders.ERROR', error);
            return reject(error);
        });
    });
};

const getAccountActivity = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            baseURL: getAlpacaBaseUrl(),
            url: '/v2/account/activities/FILL',
            headers: getAlpacaHeaders(),
            params: {
                date: params?.date || '',
            },
        }).then((response) => {
            if (response.status === 200) {
                logVerbose('ALPACA.GET_ACCOUNT_ACTIVITY: ', response.data);
                return resolve(response.data.map(activity => {
                    return {
                        broker: BROKER,
                        activityId: activity.id,
                        orderId: activity.order_id,
                        symbol: activity.symbol,
                        side: activity.side,
                        price: activity.price ? parseFloat(activity.price) : '',
                        qty: activity.qty ? parseFloat(activity.qty) : '',
                        orderStatus: activity.order_status,
                    };
                }));
            }
            throw new Error(`Failed to retrieve orders with error: ${response.status} - ${response.statusText}`);
        }).catch((error) => {
            logError('ALPACA.getAccountActivity.ERROR', error);
            return reject(error);
        });
    });
};

const getSecurities = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            baseURL: getAlpacaBaseUrl(),
            url: '/v2/assets?status=active&asset_class=us_equity&tradable=true', // Only get active, tradable, non-crypto securities
            headers: getAlpacaHeaders(),
        }).then((response) => {
            if (response.status === 200) {
                logVerbose('ALPACA.GET_SECURITIES: ', response.data);
                return resolve(response.data);
            }
            throw new Error(`Buy order failed with error: ${response.status} - ${response.statusText}`);
        }).catch((error) => {
            logError('ALPACA.getSecurities.ERROR', error);
            return reject(error);
        });
    });
};

const getCryptoSecurities = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            baseURL: getAlpacaBaseUrl(),
            url: '/v2/assets?status=active&asset_class=crypto&tradable=true', // Only get active, tradable, crypto securities
            headers: getAlpacaHeaders(),
        }).then((response) => {
            if (response.status === 200) {
                logVerbose('ALPACA.GET_CRYPTO_SECURITIES: ', response.data);
                return resolve(response.data);
            }
            throw new Error(`Buy order failed with error: ${response.status} - ${response.statusText}`);
        }).catch((error) => {
            logError('ALPACA.getCryptoSecurities.ERROR', error);
            return reject(error);
        });
    });
};

const getCryptoPositions = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            baseURL: getAlpacaBaseUrl(),
            url: '/v2/positions?asset_class=crypto',
            headers: getAlpacaHeaders(),
        }).then((response) => {
            if (response.status === 200) {
                logVerbose('ALPACA.GET_CRYPTO_POSITIONS: ', response.data);
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
            logError('ALPACA.getCryptoPositions.ERROR', error);
            return reject(error);
        });
    });
};

export {
    buy,
    sell,
    liquidatePosition,
    getAccountInfo,
    getPositions,
    getPosition,
    getOrders,
    getAccountActivity,
    getSecurities,
    getCryptoSecurities,
    getCryptoPositions,
};
