'use strict';

import filterSeries from 'async/filterSeries';
import detectSeries from 'async/detectSeries';
import Broker from '../broker/Broker.js';
const broker = new Broker();
import tradeConfig from '../trade.config.json';
import sellConfig from './sell.config.json';
import { omitBlacklistedSecurities } from '../strategies/shared/common/common-evals.js';
import { getSecurityData } from '../utils.js';

async function run() {
    const sellList = await getSellList();
    // return sellList.map(sell);
}

async function getSellList() {
    const sellStrategy = (await import("../strategies/sell/" + sellConfig.strategy + ".js")).default;
    const positions = await getPositions();
    console.log('========== Begin Sell Candidate Evaluation ==========');
    return await filterSeries(positions, async (symbol) => {
        const securityData = await getSecurityData(symbol);
        const evalFunctions = [
            omitBlacklistedSecurities,
            ...sellStrategy,
        ];
        const failures = await detectSeries(evalFunctions, async (evalFunc) => {
            const result = await evalFunc(securityData);
            console.log(`${securityData.symbol} - ${evalFunc.name} evaluated as ${result}`);
            return result === false;
        });
        return failures ? failures.length === 0 : true;
    });
}

async function getPositions() {
    const positions = await broker.getPositions();
    return positions.map(position => {
        return position.symbol;
    });
}

async function sell(symbol) {
    return await broker.buy({
        symbol,
        qty: tradeConfig.tradeQty,
    });
}

export {
    run,
};
