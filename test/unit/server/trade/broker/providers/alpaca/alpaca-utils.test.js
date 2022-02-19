import { jest } from '@jest/globals';
import constants from '../../../../../../../server/src/constants';
import { convertBuySellOrderToAlpacaRequest } from '../../../../../../../server/src/trade/broker/providers/alpaca/alpaca-utils';
import { getAxios200Response } from '../../../../../fixtures/axios';

let alpaca;
process.env.ALPACA_API_KEY = 'fake-api-key';
process.env.ALPACA_API_SECRET = 'fake-api-secret';
const oldEnv = process.env;

describe('Alpaca Utils', () => {
    beforeEach(() => {
        jest.doMock('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca.config.js', () => {
            return {
                liveApiBaseUrl: 'https://live.example.com',
                testApiBaseUrl: 'https://test.example.com',
            };
        });
    });

    beforeEach(() => {
        process.env = { ...oldEnv };
    });

    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
        process.env = oldEnv;
    });

    test('getAlpacaHeaders() correctly populates the headers', async () => {
        const axiosResponse = getAxios200Response({
            data: {
                id: 'abc123',
                symbol: 'AAPL',
                notional: null,
                qty: 1,
                status: 'filled',
                filled_at: '2021-03-16T18:38:01.937734Z',
            }
        });
        jest.doMock('axios', () => {
            return (params) => {
                return new Promise(resolve => resolve({
                    ...axiosResponse,
                    headers: params.headers,
                    config: params,
                }));
            };
        });

        const buyOrder = {
            symbol: 'AAPL',
            qty: 1,
        };
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        const result = await alpaca.buy(buyOrder);
        expect(result.response.headers).toEqual({
            'APCA-API-KEY-ID': 'fake-api-key',
            'APCA-API-SECRET-KEY': 'fake-api-secret',
        });
    });

    test('getAlpacaBaseUrl() correctly populates the live API base URL', async () => {
        process.env.ENV = 'production';

        const axiosResponse = getAxios200Response({
            data: {
                id: 'abc123',
                symbol: 'AAPL',
                notional: null,
                qty: 1,
                status: 'filled',
                filled_at: '2021-03-16T18:38:01.937734Z',
            }
        });
        jest.doMock('axios', () => {
            return (params) => {
                return new Promise(resolve => resolve({
                    ...axiosResponse,
                    headers: params.headers,
                    config: params,
                }));
            };
        });

        const buyOrder = {
            symbol: 'AAPL',
            qty: 1,
        };
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        const result = await alpaca.buy(buyOrder);
        expect(result.response.config.baseURL).toBe('https://live.example.com');
    });

    test('getAlpacaBaseUrl() correctly populates the test API base URL', async () => {
        process.env.ENV = 'development';

        const axiosResponse = getAxios200Response({
            data: {
                id: 'abc123',
                symbol: 'AAPL',
                notional: null,
                qty: 1,
                status: 'filled',
                filled_at: '2021-03-16T18:38:01.937734Z',
            }
        });
        jest.doMock('axios', () => {
            return (params) => {
                return new Promise(resolve => resolve({
                    ...axiosResponse,
                    headers: params.headers,
                    config: params,
                }));
            };
        });

        const buyOrder = {
            symbol: 'AAPL',
            qty: 1,
        };
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        const result = await alpaca.buy(buyOrder);
        expect(result.response.config.baseURL).toBe('https://test.example.com');
    });

    test('convertBuySellOrderToAlpacaRequest() converts buy order to alpaca API order request', async () => {
        const buyOrder = {
            symbol: 'FAKE',
            side: 'buy',
            type: 'market',
        };
        const alpacaRequest = convertBuySellOrderToAlpacaRequest(buyOrder);

        expect(alpacaRequest).toEqual(
            expect.objectContaining({
                symbol: 'FAKE',
                side: 'buy',
                type: 'market',
                time_in_force: expect.stringMatching(constants.REGEX.ALPACA_TIMES_IN_FORCE),
                notional: expect.any(Number),
            })
        );
    });

    test('convertBuySellOrderToAlpacaRequest() converts sell order to alpaca API order request', async () => {
        const buyOrder = {
            symbol: 'FAKE',
            side: 'sell',
            type: 'market',
        };
        const alpacaRequest = convertBuySellOrderToAlpacaRequest(buyOrder);

        expect(alpacaRequest).toEqual(
            expect.objectContaining({
                symbol: 'FAKE',
                side: 'sell',
                type: 'market',
                time_in_force: expect.stringMatching(constants.REGEX.ALPACA_TIMES_IN_FORCE),
                notional: expect.any(Number),
            })
        );
    });
});
