import moment from 'moment';
import chalk from 'chalk';
import notifier from 'node-notifier';
import asyncMap from 'async/map';
import Broker from '../broker/Broker.js';
import tradeConfig from '../trade.config.js';
import buyConfig from './buy.config.js';
import { composeEvalFunctions, evaluateSecurityCandidates } from '../trade.js';
import { BuyOrder } from '../../classes/BuyOrder.js';

const broker = new Broker();

async function run() {
    const buyList = await getBuyList();
    return await asyncMap(buyList, async symbol => {
        notifier.notify({
            title: 'Stonks',
            message: `New BUY order: ${symbol}`,
            sound: 'Breeze',
        });
        return await buy(symbol);
    });
}

async function getBuyList() {
    console.log(chalk.cyan(`\n========== Begin Buy Candidate Evaluation - ${moment().format('MMMM Do YYYY, h:mm:ss a')} ==========`));
    const buyCandidateSymbols = await getBuyCandidates();
    const evalFunctions = await composeEvalFunctions([
        ...buyConfig.defaultEvalFunctions,
        ...buyConfig.strategy.evalFunctions,
    ]);
    return await evaluateSecurityCandidates(buyCandidateSymbols, evalFunctions);
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
    return await broker.buy(new BuyOrder({
        symbol,
        notional: tradeConfig.tradeAmount,
        type: buyConfig.strategy.orderType,
    }));
}

export {
    run,
};