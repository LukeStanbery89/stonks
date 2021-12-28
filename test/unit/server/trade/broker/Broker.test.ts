'use strict';

// 1. Import the real trade.config.json
const tradeConfig = require('../../../../../server/src/trade/trade.config.json');

// 2. Mock trade.config.json
const mockTradeConfig = {
    "BROKER": "FAKE_BROKER",
    "BROKER_PROVIDERS": {
        "FAKE_BROKER": "fake-provider",
    },
    "COMMANDS": {
        "BUY": "buy",
        "SELL": "sell",
        "GET_POSITIONS": "getPositions",
        "GET_POSITION": "getPosition",
        "GET_ACCOUNT_INFO": "getAccountInfo"
    },
};
jest.doMock('../../../../../server/src/trade/trade.config.json', () => mockTradeConfig);

// 3. Mock the fake provider
const mockBuy = jest.fn(() => 'mock return');
const mockSell = jest.fn(() => 'mock return');
const mockGetPositions = jest.fn(() => 'mock return');
const mockGetPosition = jest.fn(() => 'mock return');
const mockGetAccountInfo = jest.fn(() => 'mock return');

let Broker;
let broker: any;

describe('Broker interface', () => {
    describe('', () => {
        beforeAll(async () => {
            // 3 cont.
            jest.doMock('../../../../../server/src/trade/broker/providers/fake-provider/fake-provider', () => {
                return {
                    buy: mockBuy,
                    sell: mockSell,
                    getPositions: mockGetPositions,
                    getPosition: mockGetPosition,
                    getAccountInfo: mockGetAccountInfo,
                };
            }, { virtual: true });

            // 4. Import and initialize Broker
            Broker = await require('../../../../../server/src/trade/broker/Broker').default;
            broker = new Broker();
        });

        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('buy() command calls the provider implementation', async () => {
            await broker.buy({
                symbol: 'AAPL',
                qty: 1,
            });
            expect(mockBuy).toHaveBeenCalled();
        });

        test('sell() command calls the provider implementation', async () => {
            await broker.sell({
                symbol: 'AAPL',
                qty: 1,
            });
            expect(mockSell).toHaveBeenCalled();
        });

        test('getPositions() command calls the provider implementation', async () => {
            await broker.getPositions();
            expect(mockGetPositions).toHaveBeenCalled();
        });

        test('getPosition() command calls the provider implementation', async () => {
            await broker.getPosition('AAPL');
            expect(mockGetPosition).toHaveBeenCalled();
        });

        test('getAccountInfo() command fetches brokerage account information', async () => {
            await broker.getAccountInfo();
            expect(mockGetAccountInfo).toHaveBeenCalled();
        });

        test('invoke() calls the provided function from the provider', async () => {
            await broker.invoke('buy', {
                symbol: 'AAPL',
                qty: 1,
            });
            expect(mockBuy).toHaveBeenCalled();

            await broker.invoke('sell', {
                symbol: 'AAPL',
                qty: 1,
            });
            expect(mockSell).toHaveBeenCalled();

            await broker.invoke('getPositions');
            expect(mockGetPositions).toHaveBeenCalled();

            await broker.invoke('getPosition');
            expect(mockGetPosition).toHaveBeenCalled();

            await broker.invoke('getAccountInfo');
            expect(mockGetAccountInfo).toHaveBeenCalled();
        });

        test('assignBrokerProvider() throws an error on invalid broker provider', () => {
            expect(async () => {
                await broker.assignBrokerProvider('NOT_REAL');
            }).rejects.toThrow('Cannot find module');
        });
    });

    describe('', () => {
        beforeAll(async () => {
            // Clear the previous mock of fake-provider
            jest.resetModules();

            // 3 cont.
            jest.doMock('../../../../../server/src/trade/broker/providers/fake-provider/fake-provider', () => {
                return {
                    buy: mockBuy,
                };
            }, { virtual: true });

            // 4. Import and initialize Broker
            Broker = await require('../../../../../server/src/trade/broker/Broker').default;
            broker = new Broker();
        });

        test('invoke() should throw an error when given an invalid broker command', () => {
            return expect(async () => {
                const result = await broker.invoke('sell', {
                    symbol: 'AAPL',
                    qty: 1,
                });
                console.debug('result: ', result);
            }).rejects.toThrow('Invalid broker command');
        });
    });
});

export { };
