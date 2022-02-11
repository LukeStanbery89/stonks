import filterSeries from 'async/filterSeries';
import detectSeries from 'async/detectSeries';
import moment from 'moment';
import chalk from 'chalk';
import notifier from 'node-notifier';
import asyncMap from 'async/map';
import Broker from '../broker/Broker.js';
import tradeConfig from '../trade.config.js';
import sellConfig from './sell.config.js';
import { composeEvalFunctions, generateProcessingContext, getSecurityData } from '../trade-utils.js';

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
    const positions = await getPositions();
    const processingContext = await generateProcessingContext();
    return await filterSeries(positions, async (symbol) => {
        // Reset history before evaluating each security
        processingContext.history = [];
        const securityData = await getSecurityData(symbol);
        const evalFunctions = await composeEvalFunctions([
            ...sellConfig.defaultEvalFunctions,
            ...sellConfig.strategy,
        ]);
        const failures = await detectSeries(evalFunctions, async (evalFunc) => {
            const result = await evalFunc(securityData, processingContext);
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
