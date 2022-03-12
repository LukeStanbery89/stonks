import moment from 'moment';
import chalk from 'chalk';
import notifier from 'node-notifier';
import asyncMap from 'async/map';
import Broker from '../broker/Broker.js';
import tradeConfig from '../trade.config.js';
import sellConfig from './sell.config.js';
import { composeEvalFunctions, evaluateSecurityCandidates, generateProcessingContext } from '../trade.js';
import { SellOrder } from '../../classes/SellOrder.js';

const broker = new Broker();

async function run() {
    const sellList = await getSellList();
    return await asyncMap(sellList, async symbol => {
        notifier.notify({
            title: 'Stonks',
            message: `New SELL order: ${symbol}`,
            sound: 'Breeze',
        });
        return await sell(symbol);
    });
}

async function getSellList() {
    console.log(chalk.cyan(`\n========== Begin Sell Candidate Evaluation - ${moment().format('MMMM Do YYYY, h:mm:ss a')} ==========`));

    // Retrieve our held securities so we can evaluate which ones to sell
    const positions = await getPositions();

    const evalFunctions = await composeEvalFunctions([
        ...sellConfig.defaultEvalFunctions,
        ...sellConfig.strategy.evalFunctions,
    ]);

    // Prevent duplicate call to `getPositions()` by manually creating a processingContext
    const processingContext = await generateProcessingContext({ positions });

    return await evaluateSecurityCandidates(positions, evalFunctions, processingContext);
}

async function getPositions() {
    const positions = await broker.getPositions();
    return positions.map(position => {
        return position.symbol;
    });
}

async function sell(symbol) {
    return await broker.sell(new SellOrder({
        symbol,
        notional: tradeConfig.tradeAmount,
        type: sellConfig.strategy.orderType,
    }));
}

export {
    run,
};
