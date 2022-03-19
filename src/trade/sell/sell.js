import moment from 'moment';
import chalk from 'chalk';
import notifier from 'node-notifier';
import asyncMapSeries from 'async/mapSeries';
import Broker from '../broker/Broker.js';
import tradeConfig from '../trade.config.js';
import sellConfig from './sell.config.js';
import { composeEvalFunctions, evaluateSecurityCandidates, generateProcessingContext } from '../trade.js';
import { SellOrder } from '../../classes/SellOrder.js';

const broker = new Broker();

async function run() {
    console.log(chalk.cyan(`\n========== Begin Sell Candidate Evaluation - ${moment().format('MMMM Do YYYY, h:mm:ss a')} ==========`));
    return await asyncMapSeries(sellConfig.strategies, executeStrategy);
}

async function executeStrategy(strategy) {
    // Retrieve our held securities so we can evaluate which ones to sell
    const positions = await getPositions();
    const sellList = await getSellList(strategy, positions);
    return await asyncMapSeries(sellList, async symbol => {
        notifier.notify({
            title: 'Stonks',
            message: `New SELL order: ${symbol}`,
            sound: 'Breeze',
        });
        return await sell({
            symbol,
            type: strategy.orderType,
        });
    });
}

async function getSellList(strategy, sellCandidates) {
    const evalFunctions = await composeEvalFunctions([
        ...sellConfig.defaultEvalFunctions,
        ...strategy.evalFunctions,
    ]);

    // Prevent duplicate call to `getPositions()` by manually creating a processingContext
    const processingContext = await generateProcessingContext({ positions: sellCandidates });

    return await evaluateSecurityCandidates(sellCandidates, evalFunctions, processingContext);
}

async function getPositions() {
    const positions = await broker.getPositions();
    return positions.map(position => {
        return position.symbol;
    });
}

async function sell(params) {
    return await broker.sell(new SellOrder({
        notional: tradeConfig.tradeAmount,
        ...params,
    }));
}

export {
    run,
};
