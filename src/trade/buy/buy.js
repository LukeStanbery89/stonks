import moment from 'moment';
import chalk from 'chalk';
import notifier from 'node-notifier';
import asyncMapSeries from 'async/mapSeries';
import Broker from '../broker/Broker.js';
import tradeConfig from '../trade.config.js';
import buyConfig from './buy.config.js';
import { composeEvalFunctions, evaluateSecurityCandidates } from '../trade.js';
import { BuyOrder } from '../../classes/BuyOrder.js';

const broker = new Broker();

async function run() {
    console.log(chalk.cyan(`\n========== Begin Buy Candidate Evaluation - ${moment().format('MMMM Do YYYY, h:mm:ss a')} ==========`));
    return await asyncMapSeries(buyConfig.strategies, executeStrategy);
}

async function executeStrategy(strategy) {
    const buyCandidates = await getBuyCandidates();
    const buyList = await getBuyList(strategy, buyCandidates);
    return await asyncMapSeries(buyList, async symbol => {
        notifier.notify({
            title: 'Stonks',
            message: `New BUY order: ${symbol}`,
            sound: 'Breeze',
        });
        return await buy({
            symbol,
            type: strategy.orderType,
        });
    });
}

async function getBuyList(strategy, buyCandidates) {
    const evalFunctions = await composeEvalFunctions([
        ...buyConfig.defaultEvalFunctions,
        ...strategy.evalFunctions,
    ]);
    return await evaluateSecurityCandidates(buyCandidates, evalFunctions);
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

async function buy(params) {
    return await broker.buy(new BuyOrder({
        notional: tradeConfig.tradeAmount,
        ...params,
    }));
}

export {
    run,
};
