import { jest } from '@jest/globals';
import { getAxios200Response, getAxios400Response, getAxios404Error } from '../../../../../fixtures/axios';
import constants from '../../../../../../../server/src/constants';

let alpaca;
process.env.ALPACA_API_KEY = 'fake-api-key';
process.env.ALPACA_API_SECRET = 'fake-api-secret';
const oldEnv = process.env;

describe('Alpaca Provider', () => {
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

    test('buy() processes a BuyOrder and returns a BuyResult', async () => {
        const axiosResponse = getAxios200Response({
            data: {
                id: 'abc123',
                symbol: 'AAPL',
                notional: null,
                qty: 1,
                status: 'filled',
                filled_at: '2021-03-16T18:38:01.937734Z',
                submitted_at: '2021-03-16T18:38:01.937734Z',
            }
        });
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        const buyOrder = {
            symbol: 'AAPL',
            qty: 1,
        };
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        const result = await alpaca.buy(buyOrder);
        expect(result).toEqual(
            expect.objectContaining({
                requestId: expect.any(String),
                symbol: 'AAPL',
                notional: NaN,
                qty: 1,
                securityPrice: expect.any(Number),
                broker: 'ALPACA',
                statusCode: 200,
                statusText: 'filled',
                timestamp: expect.any(String),
                response: expect.anything(),
            })
        );
    });

    test('buy() rejects the promise on error', async () => {
        const axiosResponse = getAxios400Response();
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        const buyOrder = {
            symbol: 'AAPL',
            qty: 1,
        };
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        return expect(async () => {
            const result = await alpaca.buy(buyOrder);
            expect(result).not.toBeNull();
        }).rejects.toThrow('Bad Input');
    });

    test('sell() processes a SellOrder and returns a SellResult', async () => {
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
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        const sellOrder = {
            symbol: 'AAPL',
            qty: 1,
        };
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        const result = await alpaca.sell(sellOrder);
        expect(result).toEqual(
            expect.objectContaining({
                requestId: expect.any(String),
                symbol: 'AAPL',
                notional: NaN,
                qty: 1,
                securityPrice: expect.any(Number),
                broker: 'ALPACA',
                statusCode: 200,
                statusText: 'filled',
                timestamp: expect.any(String),
                response: expect.anything(),
            })
        );
    });

    test('sell() rejects the promise on error', async () => {
        const axiosResponse = getAxios400Response();
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        const sellOrder = {
            symbol: 'AAPL',
            qty: 1,
        };
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        return expect(async () => {
            const result = await alpaca.sell(sellOrder);
            expect(result).not.toBeNull();
        }).rejects.toThrow('Bad Input');
    });

    test('getPositions() returns an array of all held securities', async () => {
        const axiosResponse = getAxios200Response({
            data: [
                {
                    asset_id: 'abc123',
                    symbol: 'AAPL',
                    qty: 1,
                    market_value: 100.00,
                    current_price: 100.00,
                    lastday_price: 100.00,
                },
                {
                    asset_id: 'def456',
                    symbol: 'MSFT',
                    qty: 2,
                    market_value: 200.00,
                    current_price: 200.00,
                    lastday_price: 200.00,
                },
                {
                    asset_id: 'ghi789',
                    symbol: 'GOOG',
                    qty: 3,
                    market_value: 300.00,
                    current_price: 300.00,
                    lastday_price: 300.00,
                },
            ]
        });
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        const result = await alpaca.getPositions();
        expect(result.length).toBe(3);
        result.forEach(res => {
            expect(res).toEqual(
                expect.objectContaining({
                    id: expect.any(String),
                    symbol: expect.any(String),
                    qty: expect.any(Number),
                    marketValue: expect.any(Number),
                    currentPrice: expect.any(Number),
                    lastDayPrice: expect.any(Number),
                    broker: 'ALPACA',
                    response: expect.anything(),
                })
            );
        });
    });

    test('getPositions() rejects the promise on error', async () => {
        const axiosResponse = getAxios400Response();
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        return expect(async () => {
            const result = await alpaca.getPositions();
            expect(result).not.toBeNull();
        }).rejects.toThrow('Bad Input');
    });

    test('getPosition() returns the held position for a given symbol', async () => {
        const axiosResponse = getAxios200Response({
            data: {
                asset_id: 'abc123',
                symbol: 'AAPL',
                qty: 1,
                market_value: 100.00,
                current_price: 100.00,
                lastday_price: 100.00,
            }
        });
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        const result = await alpaca.getPosition('AAPL');
        expect(result).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                symbol: 'AAPL',
                qty: 1,
                marketValue: 100.00,
                currentPrice: 100.00,
                lastDayPrice: 100.00,
                broker: 'ALPACA',
                response: expect.anything(),
            })
        );
    });

    test('getPosition() resolves the promise and returns null on 404, meaning no matching position found', async () => {
        const axiosError = getAxios404Error();
        jest.doMock('axios', () => {
            return () => new Promise((resolve, reject) => reject(axiosError));
        });
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        return expect(async () => {
            const result = await alpaca.getPosition('AAPL');
            expect(result).toBeNull();
        }).not.toThrow();
    });

    test('getPosition() rejects the promise on error', async () => {
        const axiosResponse = getAxios400Response();
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        return expect(async () => {
            const result = await alpaca.getPosition('AAPL');
            expect(result).not.toBeNull();
        }).rejects.toThrow('Bad Input');
    });

    test('getAccountInfo() returns the user\'s account info', async () => {
        const axiosResponse = getAxios200Response({
            data: {
                account_number: 1234567890,
                equity: 100000.00,
                pattern_day_trader: false,
            }
        });
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        const result = await alpaca.getAccountInfo();
        expect(result).toEqual(
            expect.objectContaining({
                accountNumber: 1234567890,
                broker: 'ALPACA',
                funds: 100000.00,
                patternDayTrader: false,
                response: expect.anything(),
            })
        );
    });

    test('getAccountInfo() rejects the promise on error', async () => {
        const axiosResponse = getAxios400Response();
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        return expect(async () => {
            const result = await alpaca.getAccountInfo();
            expect(result).not.toBeNull();
        }).rejects.toThrow('Bad Input');
    });

    test('getOrders() returns the user\'s orders', async () => {
        const axiosResponse = getAxios200Response({
            data: [
                {
                    id: 'abc123',
                    submitted_at: '2021-03-16T18:38:01.937734Z',
                    symbol: 'ABC',
                    notional: null,
                    qty: 1,
                    type: 'market',
                    side: 'buy',
                },
                {
                    id: 'def456',
                    submitted_at: '2021-03-16T18:38:01.937734Z',
                    symbol: 'DEF',
                    notional: null,
                    qty: 2,
                    type: 'limit',
                    side: 'sell',
                },
            ]
        });
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        const result = await alpaca.getOrders();
        expect(result.constructor.name).toBe('Array');
        result.forEach(order => {
            expect(order).toEqual(
                expect.objectContaining({
                    broker: 'ALPACA',
                    orderId: expect.any(String),
                    submittedAt: expect.any(String),
                    symbol: expect.any(String),
                    notional: NaN,
                    qty: expect.any(Number),
                    type: expect.stringMatching(constants.REGEX.ALPACA_ORDER_TYPES),
                    side: expect.stringMatching(constants.REGEX.ALPACA_ORDER_SIDES),
                })
            );
        });
    });

    test('getOrders() returns the user\'s orders', async () => {
        const axiosResponse = getAxios400Response();
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        return expect(async () => {
            const result = await alpaca.getAccountInfo();
            expect(result).not.toBeNull();
        }).rejects.toThrow('Bad Input');
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
});

export { };
