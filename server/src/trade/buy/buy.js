'use strict';

import filterSeries from "async/filterSeries";
import detectSeries from "async/detectSeries";
import Broker from "../broker/Broker.js";
const broker = new Broker();
import tradeConfig from '../trade.config.json';
import buyConfig from './buy.config.json';
import { omitBlacklistedSecurities, userHasAvailableBalance } from './strategies/common/common-evals.js';

async function run() {
    const buyList = await getBuyableSymbols();
    // FIXME: This isn't working
    // return buyableSymbols.map(buy);
};

async function getBuyableSymbols() {
    const buyStrategy = (await import("./strategies/" + buyConfig.strategy + ".js")).default;
    const buyCandidateSymbols = await getBuyCandidates();
    console.log('========== Begin Buy Candidate Evaluation ==========');
    return await filterSeries(buyCandidateSymbols, async (symbol) => {
        const securityData = await getSecurityData(symbol);
        const evalFunctions = [
            omitBlacklistedSecurities,
            userHasAvailableBalance, // TODO: Rethink this. This will need to be re-run between each buy order.
            ...buyStrategy,
        ];
        const failures = await detectSeries(evalFunctions, async (evalFunc) => {
            const result = await evalFunc(securityData);
            console.log(`${securityData.symbol} - ${evalFunc.name} evaluated as ${result}`);
            return result === false;
        });
        return failures ? failures.length === 0 : true;
    });
};

async function getBuyCandidates() {
    // TODO
    return [
        'AAPL',
        'MSFT',
        'PYPL',
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
            marketCap: 500000000000.00,
            marketCapSize: "MEGA",
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
    run,
};
