import chalk from 'chalk';
import Broker from './broker/Broker';

const broker = new Broker();

export async function generateProcessingContext() {
    return {
        history: [],
        orders: await broker.getOrders(),
    };
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
            // Runs as each eval function is called
            const result = await evalFunc(securityData, processingContext);
            console.log(`${securityData.symbol} - ${evalFunc.name} evaluated as ${result ? chalk.green(result) : chalk.red(result)}`);
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
