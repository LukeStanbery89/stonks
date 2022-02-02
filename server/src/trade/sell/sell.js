'use strict';

import filterSeries from 'async/filterSeries';
import detectSeries from 'async/detectSeries';
import moment from 'moment';
import chalk from 'chalk';
import notifier from 'node-notifier';
import asyncMap from 'async/map';
import Broker from '../broker/Broker.js';
import tradeConfig from '../trade.config.js';
import sellConfig from './sell.config.js';
import { omitBlacklistedSecurities } from '../strategies/shared/common/common-evals.js';
import { composeEvalFunctions, getSecurityData } from '../trade-utils.js';

const broker = new Broker();

async function run() {
    const sellList = await getSellList();
    return asyncMap(sellList, async symbol => {
        notifier.notify({
            title: 'Stonks',
            message: `New SELL order: ${symbol}`,
            sound: 'Breeze',
        });
        return await sell(symbol);
    });
}

async function getSellList() {
    const positions = await getPositions();
    console.log(chalk.cyan(`\n========== Begin Sell Candidate Evaluation - ${moment().format('MMMM Do YYYY, h:mm:ss a')} ==========`));
    return await filterSeries(positions, async (symbol) => {
        const securityData = await getSecurityData(symbol);
        const evalFunctions = composeEvalFunctions([
            omitBlacklistedSecurities,
            ...sellConfig.strategy,
        ]);
        const failures = await detectSeries(evalFunctions, async (evalFunc) => {
            const result = await evalFunc(securityData);
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
    return await broker.sell({
        symbol,
        qty: tradeConfig.tradeQty,
    });
}

export {
    run,
};
