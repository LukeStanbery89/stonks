'use strict';

import { jest } from '@jest/globals';

let alpaca;
process.env.ALPACA_API_KEY = 'fake-api-key';
process.env.ALPACA_API_SECRET = 'fake-api-secret';
const oldEnv = process.env;

describe('Alpaca Provider', () => {
    beforeEach(() => {
        jest.doMock('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca.config.json', () => {
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
        const axiosResponse = {
            data: {
                id: 'abc123',
                symbol: 'AAPL',
                notional: null,
                qty: 1,
                status: 'filled',
                filled_at: '2021-03-16T18:38:01.937734Z',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        const buyOrder = {
            symbol: 'AAPL',
            qty: 1,
        };
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        const result = await alpaca.buy(buyOrder);
        expect(result).not.toBeNull();
    });

    test('buy() rejects the promise on error', async () => {
        const axiosResponse = {
            data: {},
            status: 400,
            statusText: 'Bad Input',
            headers: {},
            config: {},
        };
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
        const axiosResponse = {
            data: {
                id: 'abc123',
                symbol: 'AAPL',
                notional: null,
                qty: 1,
                status: 'filled',
                filled_at: '2021-03-16T18:38:01.937734Z',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        const sellOrder = {
            symbol: 'AAPL',
            qty: 1,
        };
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        const result = await alpaca.sell(sellOrder);
        expect(result).not.toBeNull();
    });

    test('sell() rejects the promise on error', async () => {
        const axiosResponse = {
            data: {},
            status: 400,
            statusText: 'Bad Input',
            headers: {},
            config: {},
        };
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
        const axiosResponse = {
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
            ],
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        const result = await alpaca.getPositions();
        expect(result).not.toBeNull();
        expect(result.length).toBe(3);
    });

    test('getPositions() rejects the promise on error', async () => {
        const axiosResponse = {
            data: {},
            status: 400,
            statusText: 'Bad Input',
            headers: {},
            config: {},
        };
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
        const axiosResponse = {
            data: {
                asset_id: 'abc123',
                symbol: 'AAPL',
                qty: 1,
                market_value: 100.00,
                current_price: 100.00,
                lastday_price: 100.00,
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        const result = await alpaca.getPosition('AAPL');
        expect(result).not.toBeNull();
    });

    test('getPosition() resolves the promise and returns null on 404, meaning no matching position found', async () => {
        const axiosError = {
            response: {
                data: {},
                status: 404,
                statusText: 'Not Found',
                headers: {},
                config: {},
            }
        };
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
        const axiosResponse = {
            data: {},
            status: 400,
            statusText: 'Bad Input',
            headers: {},
            config: {},
        };
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
        const axiosResponse = {
            data: {
                account_number: 1234567890,
                equity: 100000.00,
                pattern_day_trader: false,
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca'));
        const result = await alpaca.getAccountInfo();
        expect(result).not.toBeNull();
    });

    test('getAccountInfo() rejects the promise on error', async () => {
        const axiosResponse = {
            data: {},
            status: 400,
            statusText: 'Bad Input',
            headers: {},
            config: {},
        };
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
        const axiosResponse = {
            data: {
                id: 'abc123',
                symbol: 'AAPL',
                notional: null,
                qty: 1,
                status: 'filled',
                filled_at: '2021-03-16T18:38:01.937734Z',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
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

        const axiosResponse = {
            data: {
                id: 'abc123',
                symbol: 'AAPL',
                notional: null,
                qty: 1,
                status: 'filled',
                filled_at: '2021-03-16T18:38:01.937734Z',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
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

        const axiosResponse = {
            data: {
                id: 'abc123',
                symbol: 'AAPL',
                notional: null,
                qty: 1,
                status: 'filled',
                filled_at: '2021-03-16T18:38:01.937734Z',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
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
