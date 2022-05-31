import moment from 'moment';
import chalk from 'chalk';
import notifier from 'node-notifier';
import asyncMapSeries from 'async/mapSeries';
import Broker from '../broker/Broker.js';
import sellConfig from './sell.config.js';
import { composeEvalFunctions, evaluateSecurityCandidates, generateProcessingContext } from '../trade.js';
import constants from '../../constants.js';
import { logVerbose } from '../../app-utils.js';

const broker = new Broker();

async function run() {
    console.log(chalk.cyan(`\n========== Begin Sell Candidate Evaluation - ${moment().format('MMMM Do YYYY, h:mm:ss a')} ==========`));
    return await asyncMapSeries(sellConfig.strategies, executeStrategy);
}

async function executeStrategy(strategy) {
    // Retrieve our held securities so we can evaluate which ones to sell
    const positions = await getPositions(strategy);
    const { symbolsToTrade: sellList, processingContext } = await getSellList(strategy, positions);

    logVerbose('sellList: ', sellList);
    logVerbose('processingContext: ', processingContext);

    return await asyncMapSeries(sellList, async security => {
        notifier.notify({
            title: 'Stonks',
            message: `New SELL order: ${security.symbol}`,
            sound: 'Breeze',
        });
        return await sell(security.symbol).catch(error => {
            console.error(error);
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

async function getPositions(strategy) {
    switch (strategy.marketType) {
        case constants.MARKET_TYPES.CRYPTO:
            return await broker.getCryptoPositions();
        case constants.MARKET_TYPES.STOCK:
            return await broker.getPositions();
        default:
            throw new Error('strategy.marketType is not valid');
    }
}

async function sell(symbol) {
    return await broker.liquidatePosition(symbol);
}

export {
    run,
};
