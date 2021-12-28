'use strict';

const axios = require('axios');
const { BROKER, ORDER_TYPE, TIME_IN_FORCE } = require('../../../trade.config.json');
const { LIVE_API_BASE_URL, TEST_API_BASE_URL } = require('./config.json');

import { AxiosResponse, JSObject } from "../../../../types";
import { BuyOrder, SellOrder } from "../../../types";
import { BrokerProvider } from "../../types";
import { AlpacaAccountInfo, AlpacaBuyResult, AlpacaPosition, AlpacaSellResult } from "./types";

const buy = async (buyOrder: BuyOrder): Promise<AlpacaBuyResult> => {
    return new Promise((resolve, reject) => {
        console.log('ALPACA buyOrder: ', buyOrder);
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
                type: ORDER_TYPE,
                time_in_force: TIME_IN_FORCE,
            },
        }).then((response: AxiosResponse) => {
            console.log('response: ', response);
            if (response.status === 200) {
                return resolve({
                    request_id: response.data.id,
                    symbol: response.data.symbol,
                    notional: parseFloat(response.data.notional),
                    qty: parseFloat(response.data.qty),
                    security_price: 0.00, // TODO Figure out where to get this from
                    broker: BROKER,
                    statusCode: response.status,
                    statusText: response.data.status,
                    timestamp: response.data.filled_at,
                    response: response.data,
                });
            }
            throw new Error(`Buy order failed with error: ${response.status} - ${response.statusText}`);
        }).catch((error: Error) => {
            return reject(error);
        });
    });
};

const sell = async (sellOrder: SellOrder): Promise<AlpacaSellResult> => {
    return new Promise((resolve, reject) => {
        console.log('ALPACA buyOrder: ', sellOrder);
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
                type: ORDER_TYPE,
                time_in_force: TIME_IN_FORCE,
            },
        }).then((response: AxiosResponse) => {
            console.log('response: ', response);
            if (response.status === 200) {
                return resolve({
                    request_id: response.data.id,
                    symbol: response.data.symbol,
                    qty: parseFloat(response.data.qty),
                    security_price: 0.00, // TODO Figure out where to get this from
                    broker: BROKER,
                    statusCode: response.status,
                    statusText: response.data.status,
                    timestamp: response.data.filled_at,
                    response: response.data,
                });
            }
            throw new Error(`Sell order failed with error: ${response.status} - ${response.statusText}`);
        }).catch((error: Error) => {
            return reject(error);
        });
    });
};

const getPositions = async (): Promise<AlpacaPosition[]> => {
    return new Promise((resolve, reject) => {
        console.log('ALPACA positions');
        axios({
            method: 'GET',
            baseURL: getAlpacaBaseUrl(),
            url: '/v2/positions',
            headers: getAlpacaHeaders(),
        }).then((response: AxiosResponse) => {
            console.log('response: ', response);
            if (response.status === 200) {
                return resolve(response.data.map((position: JSObject): AlpacaPosition => {
                    return {
                        id: position.asset_id,
                        symbol: position.symbol,
                        qty: parseFloat(position.qty),
                        market_value: position.market_value,
                        current_price: position.current_price,
                        lastday_price: position.lastday_price,
                        broker: BROKER,
                        response: position,
                    };
                }));
            }
            throw new Error(`Buy order failed with error: ${response.status} - ${response.statusText}`);
        }).catch((error: Error) => {
            return reject(error);
        });
    });
};

const getPosition = async (symbol: string): Promise<AlpacaPosition> => {
    return new Promise((resolve, reject) => {
        console.log('ALPACA positions');
        axios({
            method: 'GET',
            baseURL: getAlpacaBaseUrl(),
            url: `/v2/positions/${symbol}`,
            headers: getAlpacaHeaders(),
        }).then((response: AxiosResponse) => {
            console.log('response: ', response);
            if (response.status === 200) {
                return resolve({
                    id: response.data.asset_id,
                    symbol: response.data.symbol,
                    qty: parseFloat(response.data.qty),
                    market_value: response.data.market_value,
                    current_price: response.data.current_price,
                    lastday_price: response.data.lastday_price,
                    broker: BROKER,
                    response: response.data,
                });
            }
            throw new Error(`Buy order failed with error: ${response.status} - ${response.statusText}`);
        }).catch((error: Error) => {
            return reject(error);
        });
    });
};

const getAccountInfo = async (): Promise<AlpacaAccountInfo> => {
    return new Promise((resolve, reject) => {
        console.log('ALPACA positions');
        axios({
            method: 'GET',
            baseURL: getAlpacaBaseUrl(),
            url: '/v2/account',
            headers: getAlpacaHeaders(),
        }).then((response: AxiosResponse) => {
            console.log('response: ', response);
            if (response.status === 200) {
                return resolve({
                    account_number: response.data.account_number,
                    broker: BROKER,
                    funds: response.data.equity, // TODO: Make sure we're using the correct value here
                    pattern_day_trader: response.data.pattern_day_trader,
                    response: response.data,
                });
            }
            throw new Error(`Buy order failed with error: ${response.status} - ${response.statusText}`);
        }).catch((error: Error) => {
            return reject(error);
        });
    });
};

const getAlpacaHeaders = () => {
    return {
        "APCA-API-KEY-ID": process.env.ALPACA_API_KEY,
        "APCA-API-SECRET-KEY": process.env.ALPACA_API_SECRET,
    };
};

const getAlpacaBaseUrl = () => {
    switch (process.env.ENV) {
        case 'production':
            return LIVE_API_BASE_URL;
        default:
            return TEST_API_BASE_URL;
    }
};

const exp: BrokerProvider = {
    buy,
    sell,
    getAccountInfo,
    getPositions,
    getPosition,
};

export default exp;
