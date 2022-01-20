'use strict';

import filterSeries from 'async/filterSeries';
import detectSeries from 'async/detectSeries';
import Broker from "../broker/Broker.js";
const broker = new Broker();
import tradeConfig from '../trade.config.json';
import buyConfig from './buy.config.json';
import { getSecurityData } from '../utils.js';
import { securityIsNotAlreadyOwned } from '../strategies/buy/common/common-evals.js';
import { omitBlacklistedSecurities } from '../strategies/shared/common/common-evals.js';

async function run() {
    const buyList = await getBuyList();
    // FIXME: This isn't working
    // return buyList.map(buy);
}

async function getBuyList() {
    const buyStrategy = (await import("../strategies/buy/" + buyConfig.strategy + ".js")).default;
    const buyCandidateSymbols = await getBuyCandidates();
    console.log('========== Begin Buy Candidate Evaluation ==========');
    return await filterSeries(buyCandidateSymbols, async (symbol) => {
        const securityData = await getSecurityData(symbol);
        const evalFunctions = [
            omitBlacklistedSecurities,
            securityIsNotAlreadyOwned,
            ...buyStrategy,
        ];
        const failures = await detectSeries(evalFunctions, async (evalFunc) => {
            const result = await evalFunc(securityData);
            console.log(`${securityData.symbol} - ${evalFunc.name} evaluated as ${result}`);
            return result === false;
        });
        return failures ? failures.length === 0 : true;
    });
}

async function getBuyCandidates() {
    // TODO
    return [
        'AAPL',
        'MSFT',
        'PYPL',
        'GOOG',
        'USB',
        'BAC',
        'CAP',
    ];
}

async function buy(symbol) {
    return await broker.buy({
        symbol,
        qty: tradeConfig.tradeQty,
    });
}

export {
    run,
};
