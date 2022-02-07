let buyModule;

/*****************/

console.log = jest.fn();
jest.mock('node-notifier', () => {
    return {
        notify: jest.fn(),
    };
});
jest.mock('axios');

const mockBuy = jest.fn(symbol => new Promise(resolve => resolve(symbol)));
const mockComposeEvalFunctions = jest.fn(evalFuncs => new Promise(resolve => resolve(evalFuncs)));
const mockGetSecurityData = jest.fn(symbol => new Promise(resolve => resolve({ symbol })));

jest.mock('../../../../../server/src/trade/buy/buy.config.js', () => {
    return {
        strategy: [
            // TODO: Write tests for use cases where symbols are not purchased.        
            () => new Promise(resolve => resolve(true)),
            () => new Promise(resolve => resolve(true)),
            () => new Promise(resolve => resolve(true)),
        ],
    };
});

jest.mock('../../../../../server/src/trade/strategies/buy/common/common-evals.js', () => {
    return {
        securityIsNotAlreadyOwned: () => new Promise(resolve => resolve(true)),
    };
});
jest.mock('../../../../../server/src/trade/strategies/shared/common/common-evals.js', () => {
    return {
        omitBlacklistedSecurities: () => new Promise(resolve => resolve(true)),
    };
});

jest.mock('../../../../../server/src/trade/broker/Broker.js', () => {
    return jest.fn().mockImplementation(() => {
        return {
            buy: mockBuy,
            getOrders: jest.fn(() => new Promise(resolve => resolve([]))),
            getPositions: jest.fn(() => new Promise(resolve => resolve([]))),
            getPosition: jest.fn(() => new Promise(resolve => resolve({}))),
        };
    });
});

jest.mock('../../../../../server/src/trade/trade-utils.js', () => {
    return {
        composeEvalFunctions: mockComposeEvalFunctions,
        getSecurityData: mockGetSecurityData,
    };
});

/*****************/

describe('Buy Module', () => {
    beforeEach(async () => {
        buyModule = (await import('../../../../../server/src/trade/buy/buy.js'));
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('run() function', async () => {
        const result = await buyModule.run();

        expect(mockGetSecurityData).toHaveBeenCalledTimes(11);
        expect(mockComposeEvalFunctions).toHaveBeenCalledTimes(11);
        expect(mockBuy).toHaveBeenCalledTimes(11);
        expect(result.constructor.name).toBe('Array');
        expect(result.length).toBe(11);
        result.forEach(buyResult => {
            expect(buyResult).toEqual(
                expect.objectContaining({
                    symbol: expect.any(String),
                    qty: expect.any(Number),
                })
            );
        });
    });
});

export { };
