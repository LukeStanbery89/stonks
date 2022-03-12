import mockConstants from '../../../../../src/constants'; // Var name needs to be prefixed with "mock"

let buyModule;

/*****************/

console.log = jest.fn();
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
        strategy: {
            orderType: 'market',
            evalFunctions: [
                // TODO: Write tests for use cases where symbols are not purchased.
                (securityData, processingContext) => new Promise(resolve => {
                    expect(securityData).toEqual(
                        expect.objectContaining({
                            symbol: expect.any(String),
                            name: expect.any(String),
                            price: expect.any(Number),
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
        },
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
const mockBuy = jest.fn(symbol => new Promise(resolve => resolve(symbol)));
jest.mock('../../../../../src/trade/broker/Broker.js', () => {
    return jest.fn().mockImplementation(() => {
        return {
            buy: mockBuy,
            getOrders: jest.fn(() => new Promise(resolve => resolve([]))),
            getPositions: jest.fn(() => new Promise(resolve => resolve([]))),
            getPosition: jest.fn(() => new Promise(resolve => resolve({}))),
            getAccountActivity: jest.fn(() => new Promise(resolve => resolve([]))),
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

        expect(mockBuy).toHaveBeenCalledTimes(11);
        expect(result.constructor.name).toBe('Array');
        expect(result.length).toBe(11);
        result.forEach(buyResult => {
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

export { };
