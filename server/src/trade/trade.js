import filterSeries from 'async/filterSeries';
import detectSeries from 'async/detectSeries';
import chalk from 'chalk';
import Broker from './broker/Broker';
import moment from 'moment';

const broker = new Broker();

export async function generateProcessingContext() {
    return {
        accountActivityToday: await broker.getAccountActivity({ date: moment().format('YYYY-MM-DD') }),
        history: [],
        orders: await broker.getOrders(),
    };
}

export async function evaluateSecurityCandidates(symbols, evalFunctions) {
    const processingContext = await generateProcessingContext();
    return await filterSeries(symbols, async (symbol) => {
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
}

export async function getSecurityData(symbol) {
    return new Promise(resolve => {
        // TODO
        return resolve({
            symbol,
            name: 'Company Name, LLC',
            price: 123.45,
            closePrice: 100.00,
            marketCap: 500000000000.00,
            marketCapSize: 'MEGA',
        });
    });
}

export async function composeEvalFunctions(evalFunctions) {
    return evalFunctions.map(evalFunc => {
        return async (securityData, processingContext) => {
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
