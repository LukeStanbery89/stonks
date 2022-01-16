'use strict';

import { jest } from '@jest/globals';

const mockTradeConfig = {
    "broker": "FAKE_BROKER",
    "brokerProviders": {
        "FAKE_BROKER": "fake-provider",
    },
    "commands": {
        "BUY": "buy",
        "SELL": "sell",
        "GET_POSITIONS": "getPositions",
        "GET_POSITION": "getPosition",
        "GET_ACCOUNT_INFO": "getAccountInfo"
    },
};
jest.doMock('../../../../../server/src/trade/trade.config.json', () => mockTradeConfig);

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
        Broker = (await import('../../../../../server/src/trade/broker/Broker.js')).default.default;
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

    test('_assignBrokerProvider() throws an error on invalid broker provider', () => {
        expect(async () => {
            await broker._assignBrokerProvider('NOT_REAL');
        }).rejects.toThrow('Cannot find module');
    });

    test('_invoke() calls the provided function from the provider', async () => {
        await broker._invoke('buy', {
            symbol: 'AAPL',
            qty: 1,
        });
        expect(mockBuy).toHaveBeenCalled();

        await broker._invoke('sell', {
            symbol: 'AAPL',
            qty: 1,
        });
        expect(mockSell).toHaveBeenCalled();

        await broker._invoke('getPositions');
        expect(mockGetPositions).toHaveBeenCalled();

        await broker._invoke('getPosition');
        expect(mockGetPosition).toHaveBeenCalled();

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
