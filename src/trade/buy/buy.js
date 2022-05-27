import moment from 'moment';
import chalk from 'chalk';
import notifier from 'node-notifier';
import asyncMapSeries from 'async/mapSeries';
import Broker from '../broker/Broker.js';
import tradeConfig from '../trade.config.js';
import buyConfig from './buy.config.js';
import { composeEvalFunctions, evaluateSecurityCandidates } from '../trade.js';
import { BuyOrder } from '../../classes/BuyOrder.js';
import constants from '../../constants.js';
import { logVerbose } from '../../app-utils.js';

const broker = new Broker();

async function run() {
    console.log(chalk.cyan(`\n========== Begin Buy Candidate Evaluation - ${moment().format('MMMM Do YYYY, h:mm:ss a')} ==========`));
    return await asyncMapSeries(buyConfig.strategies, executeStrategy);
}

async function executeStrategy(strategy) {
    const buyCandidates = await getBuyCandidates(strategy);
    const { symbolsToTrade: buyList, processingContext } = await getBuyList(strategy, buyCandidates);

    logVerbose('buyList: ', buyList);
    logVerbose('processingContext: ', processingContext);

    return await asyncMapSeries(buyList, async security => {
        notifier.notify({
            title: 'Stonks',
            message: `New BUY order: ${security.symbol}`,
            sound: 'Breeze',
        });
        return await buy({
            symbol: security.symbol,
            type: strategy.orderType,
        }).catch(error => {
            console.error(error);
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

async function getBuyCandidates(strategy) {
    switch (strategy.marketType) {

        // Crypto
        case constants.MARKET_TYPES.CRYPTO:
            return await broker.getCryptoSymbols();

        // Stocks
        case constants.MARKET_TYPES.STOCK:
            // TODO: Make this fetch a real list
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
        default:
            throw new Error('strategy.marketType is not valid');
    }
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
