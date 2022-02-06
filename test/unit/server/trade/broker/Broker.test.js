import { jest } from '@jest/globals';

const mockTradeConfig = {
    broker: 'FAKE_BROKER',
    brokerProviders: {
        FAKE_BROKER: 'fake-provider',
    },
    commands: {
        BUY: 'buy',
        SELL: 'sell',
        GET_POSITIONS: 'getPositions',
        GET_POSITION: 'getPosition',
        GET_ACCOUNT_INFO: 'getAccountInfo'
    },
};
jest.doMock('../../../../../server/src/trade/trade.config.js', () => mockTradeConfig);

let Broker;
let broker;

import {
    buy as mockBuy,
    sell as mockSell,
    getPositions as mockGetPositions,
    getPosition as mockGetPosition,
    getAccountInfo as mockGetAccountInfo,
} from './providers/__mocks__/fake-provider';

describe('Broker interface', () => {
    beforeAll(async () => {
        Broker = (await import('../../../../../server/src/trade/broker/Broker.js')).default;
        broker = new Broker();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('buy() command calls the provider implementation', async () => {
        const result = await broker.buy({
            symbol: 'AAPL',
            qty: 1,
        });
        expect(mockBuy).toHaveBeenCalled();
        expect(result.symbol).toBe('AAPL');
        expect(result.qty).toBe(1);
    });

    test('sell() command calls the provider implementation', async () => {
        const result = await broker.sell({
            symbol: 'AAPL',
            qty: 1,
        });
        expect(mockSell).toHaveBeenCalled();
        expect(result.symbol).toBe('AAPL');
        expect(result.qty).toBe(1);
    });

    test('getPositions() command calls the provider implementation', async () => {
        await broker.getPositions();
        expect(mockGetPositions).toHaveBeenCalled();
    });

    test('getPosition() command calls the provider implementation', async () => {
        const result = await broker.getPosition('AAPL');
        expect(mockGetPosition).toHaveBeenCalled();
        expect(result).toBe('AAPL');
    });

    test('getAccountInfo() command fetches brokerage account information', async () => {
        await broker.getAccountInfo();
        expect(mockGetAccountInfo).toHaveBeenCalled();
    });

    test('_assignBrokerProvider() throws an error on invalid broker provider', () => {
        return expect(async () => {
            await broker._assignBrokerProvider('NOT_REAL');
        }).rejects.toThrow('Cannot find module');
    });

    test('_invoke(buy) calls the provided buy() function from the provider', async () => {
        const result = await broker._invoke('buy', {
            symbol: 'AAPL',
            qty: 1,
        });
        expect(mockBuy).toHaveBeenCalled();
        expect(result.symbol).toBe('AAPL');
        expect(result.qty).toBe(1);
    });

    test('_invoke(sell) calls the provided sell() function from the provider', async () => {
        const result = await broker._invoke('sell', {
            symbol: 'AAPL',
            qty: 1,
        });
        expect(mockSell).toHaveBeenCalled();
        expect(result.symbol).toBe('AAPL');
        expect(result.qty).toBe(1);
    });

    test('_invoke(getPositions) calls the provided getPositions() function from the provider', async () => {
        await broker._invoke('getPositions');
        expect(mockGetPositions).toHaveBeenCalled();
    });

    test('_invoke(getPosition) calls the provided getPosition() function from the provider', async () => {
        const result = await broker._invoke('getPosition', 'AAPL');
        expect(mockGetPosition).toHaveBeenCalled();
        expect(result).toBe('AAPL');
    });

    test('_invoke(getAccountInfo) calls the provided getAccountInfo() function from the provider', async () => {
        await broker._invoke('getAccountInfo');
        expect(mockGetAccountInfo).toHaveBeenCalled();
    });

    test('_invoke() should throw an error when given an invalid broker command', () => {
        return expect(async () => {
            const result = await broker._invoke('fakeCommand', {
                symbol: 'AAPL',
                qty: 1,
            });
            console.debug('result: ', result);
        }).rejects.toThrow('Invalid broker command');
    });
});

export { };
