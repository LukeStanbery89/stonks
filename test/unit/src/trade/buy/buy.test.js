import mockConstants from '../../../../../src/constants'; // Var name needs to be prefixed with "mock"

const mockStrategy = {
    marketType: 'CRYPTO',
    orderType: 'market',
    evalFunctions: [
        // TODO: Write tests for use cases where symbols are not purchased.
        (securityData, processingContext) => new Promise(resolve => {
            expect(securityData).toEqual(
                expect.objectContaining({
                    symbol: expect.any(String),
                    price: expect.any(Number),
                    notional: expect.any(Number),
                    closePrice: expect.any(Number),
                    marketCap: expect.any(Number),
                    marketCapSize: expect.stringMatching(mockConstants.REGEX.MARKET_CAP_SIZES),
                })
            );
            expect(processingContext).toEqual(
                expect.objectContaining({
                    history: expect.any(Array),
                    orders: expect.any(Array),
                })
            );
            resolve(true);
        }),
    ]
};

let buyModule;

/*****************/

console.log = jest.fn();
console.error = jest.fn();

jest.mock('node-notifier', () => {
    return {
        notify: jest.fn(),
    };
});
jest.mock('axios');

jest.mock('../../../../../src/trade/buy/buy.config.js', () => {
    return {
        defaultEvalFunctions: [
            () => new Promise(resolve => resolve(true)),
        ],
        strategies: [
            mockStrategy,
            mockStrategy,
        ],
    };
});

jest.mock('../../../../../src/trade/strategies/eval-functions/buy-eval-functions.js', () => {
    return {
        securityIsNotAlreadyOwned: () => new Promise(resolve => resolve(true)),
    };
});
jest.mock('../../../../../src/trade/strategies/eval-functions/shared-eval-functions.js', () => {
    return {
        omitBlacklistedSecurities: () => new Promise(resolve => resolve(true)),
    };
});

// TODO: Mock the broker provider instead of the broker interface
const mockBuy = jest.fn(buyOrder => new Promise(resolve => resolve(buyOrder)));
jest.mock('../../../../../src/trade/broker/Broker.js', () => {
    const cryptoSymbols = [{ symbol: 'BTCUSD', qty: 1, marketValue: 10.00, currentPrice: 12.00 }];
    return jest.fn().mockImplementation(() => {
        return {
            buy: mockBuy,
            getOrders: jest.fn(() => new Promise(resolve => resolve([]))),
            getPositions: jest.fn(() => new Promise(resolve => resolve([]))),
            getPosition: jest.fn(() => new Promise(resolve => resolve({}))),
            getAccountActivity: jest.fn(() => new Promise(resolve => resolve([]))),
            getCryptoSymbols: jest.fn(() => new Promise(resolve => resolve(cryptoSymbols))),
            getCryptoPositions: jest.fn(() => new Promise(resolve => resolve([]))),
        };
    });
});

/*****************/

describe('Buy Module', () => {
    beforeEach(async () => {
        buyModule = (await import('../../../../../src/trade/buy/buy.js'));
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('run() function', async () => {
        const result = await buyModule.run();

        expect(mockBuy).toHaveBeenCalledTimes(2);
        expect(result.constructor.name).toBe('Array');
        expect(result.length).toBe(2);
        result.forEach(buyResultSet => {
            buyResultSet.forEach(buyResult => {
                expect(buyResult).toEqual(
                    expect.objectContaining({
                        order: expect.objectContaining({
                            symbol: expect.any(String),
                            qty: undefined,
                            notional: expect.any(Number),
                            side: 'buy',
                            type: 'market',
                        })
                    })
                );
            });
        });
    });
});

export { };
