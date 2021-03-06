import filterSeries from 'async/filterSeries';
import detectSeries from 'async/detectSeries';
import chalk from 'chalk';
import Broker from './broker/Broker';
import moment from 'moment';
import { logVerbose } from '../app-utils';

const broker = new Broker();

export async function generateProcessingContext(overrides = {}) {
    return {
        // A ledger of market transactions made by the user today
        accountActivityToday: overrides.accountActivityToday || await broker.getAccountActivity({ date: moment().format('YYYY-MM-DD') }),

        // A record of eval functions run during the current routine and their results
        history: [],

        // A list of open orders on the user's brokerage account
        orders: overrides.orders || await broker.getOrders(),

        // A list of the user's currently held securities/crypto
        positions: overrides.positions || [
            ...(await broker.getPositions()),
            ...(await broker.getCryptoPositions()),
        ],
    };
}

export async function evaluateSecurityCandidates(symbols, evalFunctions, processingContextOverride = null) {
    const processingContext = processingContextOverride || await generateProcessingContext();

    const symbolsToTrade = await filterSeries(symbols, async (symbol) => {
        // Clear evaluation history before evaluating a new security
        processingContext.history = [];

        // Get market data for the current security. This is consumed 
        // by the eval functions to determine if we should submit an 
        // order for this security.
        const securityData = await getSecurityData(symbol);

        // Each eval function consumes the securityData. If any eval
        // function fails, then reject that security.
        const failures = await detectSeries(evalFunctions, async (evalFunc) => {
            const result = await evalFunc(securityData, processingContext);
            return result === false;
        });

        return failures ? failures.length === 0 : true;
    });

    return {
        symbolsToTrade,
        processingContext,
    };
}

export async function getSecurityData(security) {
    return new Promise(resolve => {
        // TODO
        return resolve({
            symbol: security.symbol,
            qty: security.qty,
            notional: security.marketValue,
            price: security.currentPrice,
            closePrice: 100.00, // FIXME
            marketCap: 500000000000.00, // FIXME
            marketCapSize: 'MEGA', // FIXME
        });
    });
}

export async function composeEvalFunctions(evalFunctions) {
    return evalFunctions.map(evalFunc => {
        return async (securityData, processingContext) => {
            logVerbose('securityData: ', securityData);
            const result = await evalFunc(securityData, processingContext);
            console.log(`${securityData.symbol} - ${evalFunc.name} evaluated as ${result ? chalk.green(result) : chalk.red(result)}`);

            // Keep a record of the eval function results
            logEvalResultToHistory({
                securityData,
                evalFunction: evalFunc,
                result,
                processingContext,
            });

            return result;
        };
    });
}

function logEvalResultToHistory({ securityData, evalFunction, result, processingContext }) {
    const historyEntry = {
        evalFunction: evalFunction.name,
        result,
        symbol: securityData.symbol,
    };
    if (!processingContext.history) {
        processingContext.history = [];
    }
    return processingContext.history.push(historyEntry);
}
