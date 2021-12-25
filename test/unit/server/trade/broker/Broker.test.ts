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
const mockBuy = jest.fn();
const mockSell = jest.fn();
const mockGetPositions = jest.fn();
const mockGetPosition = jest.fn();
const mockGetAccountInfo = jest.fn();
jest.doMock('../../../../../server/src/trade/broker/providers/fake-provider', () => {
    return {
        buy: mockBuy,
        sell: mockSell,
        getPositions: mockGetPositions,
        getPosition: mockGetPosition,
        getAccountInfo: mockGetAccountInfo,
    };
}, { virtual: true });

// 4. Import and initialize Broker
import Broker from '../../../../../server/src/trade/broker/Broker';
const broker = new Broker();

describe('Broker interface', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('but() command invokes a buy order', async () => {
        await broker.buy({
            symbol: 'AAPL',
            qty: 1,
        });
        expect(mockBuy).toHaveBeenCalled();
    });

    it('sell() command invokes a buy order', async () => {
        await broker.sell({
            symbol: 'AAPL',
            qty: 1,
        });
        expect(mockSell).toHaveBeenCalled();
    });

    it('getPositions() command fetches owned symbols', async () => {
        await broker.getPositions();
        expect(mockGetPositions).toHaveBeenCalled();
    });

    it('getPosition() command fetches owned symbols', async () => {
        await broker.getPosition('AAPL');
        expect(mockGetPosition).toHaveBeenCalled();
    });

    it('getAccountInfo() command fetches brokerage account information', async () => {
        await broker.getAccountInfo();
        expect(mockGetAccountInfo).toHaveBeenCalled();
    });

    it('invoke() calls the provided function from the provider', async () => {
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

    it('assignBrokerProvider() throws an error on invalid broker provider', () => {
        expect(async () => {
            await broker.assignBrokerProvider('NOT_REAL');
        }).rejects.toThrow('Cannot find module');
    });
});

export { };
