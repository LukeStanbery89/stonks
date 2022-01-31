import chalk from 'chalk';

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

export const composeEvalFunctions = (() => {
    const aggregate = {};
    return (evalFunctions) => {
        return evalFunctions.map(evalFunc => {
            return async (securityData) => {
                const result = await evalFunc(securityData, aggregate);
                console.log(`${securityData.symbol} - ${evalFunc.name} evaluated as ${result ? chalk.green(result) : chalk.red(result)}`);
                logEvalResultToHistory({ securityData, evalFunc, result, aggregate });
                return result;
            };
        });
    };
})();

function logEvalResultToHistory({ securityData, evalFunction, result, aggregate }) {
    console.log('aggregate: ', aggregate);
    const historyEntry = {
        evalFunction,
        result,
        symbol: securityData.symbol,
    };
    if (!aggregate.history) {
        aggregate.history = [];
    }
    return aggregate.history.push(historyEntry);
}
