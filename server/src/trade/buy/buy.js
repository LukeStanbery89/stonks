'use strict';

import filterSeries from 'async/filterSeries';
import detectSeries from 'async/detectSeries';
import moment from 'moment';
import chalk from 'chalk';
import notifier from 'node-notifier';
import asyncMap from 'async/map';
import Broker from '../broker/Broker.js';
import tradeConfig from '../trade.config.json';
import buyConfig from './buy.config.json';
import { composeEvalFunctions, getSecurityData } from '../trade-utils.js';
import { securityIsNotAlreadyOwned } from '../strategies/buy/common/common-evals.js';
import { omitBlacklistedSecurities } from '../strategies/shared/common/common-evals.js';

const broker = new Broker();

async function run() {
    const buyList = await getBuyList();
    return asyncMap(buyList, async symbol => {
        notifier.notify({
            title: 'Stonks',
            message: `New BUY order: ${symbol}`,
            sound: 'Breeze',
        });
        return await buy(symbol);
    });
}

async function getBuyList() {
    const buyStrategy = (await import('../strategies/buy/' + buyConfig.strategy + '.js')).default;
    const buyCandidateSymbols = await getBuyCandidates();
    console.log(chalk.cyan(`\n========== Begin Buy Candidate Evaluation - ${moment().format('MMMM Do YYYY, h:mm:ss a')} ==========`));
    return await filterSeries(buyCandidateSymbols, async (symbol) => {
        const securityData = await getSecurityData(symbol);
        const evalFunctions = composeEvalFunctions([
            omitBlacklistedSecurities,
            securityIsNotAlreadyOwned,
            ...buyStrategy,
        ]);
        const failures = await detectSeries(evalFunctions, async (evalFunc) => {
            const result = await evalFunc(securityData);
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
        'MRNA',
        'FTNT',
        'NVDA',
        'MRVL',
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
