'use strict';

import axios from "axios";
import { BuyOrder } from "../types";

const {
    WHITELIST,
    BLACKLIST,
    MAX_SYMBOLS_PER_JOB,
    API,
}: {
    WHITELIST: string[],
    BLACKLIST: string[],
    MAX_SYMBOLS_PER_JOB: number,
    API: any, // FIXME
} = require('./trade.config.json');

async function account() {
    const ACCOUNT = API.ALPACA.ENDPOINTS.ACCOUNT;
    const headers = getAlpacaHeaders();
    const response = await axios({
        method: ACCOUNT.METHOD,
        baseURL: getAlpacaBaseUrl(),
        url: ACCOUNT.URL,
        headers,
    });
    console.log(response);
    return response.data;
}

async function positions(symbol: string = '') {
    console.log('symbol: ', symbol);
    const POSITIONS = API.ALPACA.ENDPOINTS.POSITIONS;
    const headers = getAlpacaHeaders();
    const url = symbol ? `${POSITIONS.URL}/${symbol}` : POSITIONS.URL;
    const response = await axios({
        method: POSITIONS.METHOD,
        baseURL: getAlpacaBaseUrl(),
        url: `${POSITIONS.URL}${symbol ? '/' + symbol : ''}`,
        headers,
    });
    console.log(response);
    return response.data;
}

async function buy(data: BuyOrder) {
    const BUY = API.ALPACA.ENDPOINTS.NEW_ORDER;
    const headers = getAlpacaHeaders();
    const response = await axios({
        method: BUY.METHOD,
        baseURL: getAlpacaBaseUrl(),
        url: BUY.URL,
        data,
        headers,
    });
    console.log(response);
    return response.data;
}

function getBuyList(): string[] {
    const tradeList: string[] = [
        ...WHITELIST,
        ...getBuyableSymbols(),
    ];
    const filteredTradeList: string[] = tradeList.filter((symbol: string) => !BLACKLIST.includes(symbol));
    return filteredTradeList.slice(0, MAX_SYMBOLS_PER_JOB);
};

function getAlpacaHeaders() {
    // FIXME: DO NOT COMMIT THESE VALUES
    return {
        "APCA-API-KEY-ID": "",
        "APCA-API-SECRET-KEY": "",
    };
}

function getAlpacaBaseUrl() {
    switch (process.env.ENV) {
        case 'production':
            return API.ALPACA.LIVE_API_BASE_URL;
        default:
            return API.ALPACA.TEST_API_BASE_URL;
    }
}

// TODO
function getBuyableSymbols(): string[] {
    return [
        "PYPL",
        "AAA",
        "BBB",
        "CCC",
        "DDD",
        "EEE",
        "FFF",
        "GGG",
        "HHH",
        "III",
        "JJJ",
        "KKK",
        "LLL",
        "MMM",
        "NNN",
        "OOO",
        "PPP",
        "QQQ",
        "RRR",
        "SSS",
        "TTT",
        "UUU",
        "VVV",
        "WWW",
        "XXX",
        "YYY",
        "ZZZ",
    ];
};

export {
    account,
    buy,
    getBuyList,
    positions,
};