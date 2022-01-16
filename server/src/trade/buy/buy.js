'use strict';

import Q, { async } from 'q';
import Broker from "../broker/Broker.js";
const broker = new Broker();
import tradeConfig from '../trade.config.json';
import buyConfig from './buy.config.json';
import commonFilters from './common-filters.js';

// FIXME: None of this works
async function buySymbols() {
    getBuyableSymbols().then(symbolsToBuy => {
        console.log('symbolsToBuy 1: ', symbolsToBuy);
        return symbolsToBuy.map(buy);
    }).catch(err => {
        console.error(err);
    });
};

function getBuyableSymbols() {
    return new Promise((resolve, reject) => {
        // NOTE: Must use concatenation here. String interpolation breaks the import.
        import("./strategies/" + buyConfig.strategy + ".js").then(resolved => {
            const strategy = resolved.default;
            const allSymbols = getAllSymbols();
            const symbolsToBuy = allSymbols.filter(async (symbol) => {
                const securityData = await getSecurityData(symbol);
                console.log('securityData: ', securityData);
                const result = [
                    ...commonFilters,
                    ...strategy,
                ].reduce(Q.when, Q(securityData));
                console.log('result: ', result);
                return true;
            });
            console.log('symbolsToBuy 2: ', symbolsToBuy);
            return resolve(symbolsToBuy);
        }).catch(err => {
            return reject(err);
        });
    });
};

function getAllSymbols() {
    // TODO
    return [
        'AAPL',
        'MSFT',
        'GOOG',
    ];
}

async function getSecurityData(symbol) {
    return new Promise(resolve => {
        // TODO
        return resolve({
            symbol,
            name: 'Company Name, LLC',
            price: 123.45,
            closePrice: 100.00,
        });
    });
}

async function buy(symbol) {
    return await broker.buy({
        symbol,
        qty: tradeConfig.tradeQty,
    });
};

export {
    buySymbols,
};
