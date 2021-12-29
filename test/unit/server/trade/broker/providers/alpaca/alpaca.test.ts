let alpaca: any;
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AlpacaAccountInfo, AlpacaBuyResult, AlpacaPosition, AlpacaSellResult } from '../../../../../../../server/src/trade/broker/providers/alpaca/types';

process.env.ALPACA_API_KEY = 'fake-api-key';
process.env.ALPACA_API_SECRET = 'fake-api-secret';
const oldEnv = process.env;

describe('Alpaca Provider', () => {
    beforeAll(() => {
        jest.doMock('../../../../../../../server/src/trade/broker/providers/alpaca/config.json', () => {
            return {
                LIVE_API_BASE_URL: 'https://live.example.com',
                TEST_API_BASE_URL: 'https://test.example.com',
            };
        });
    });

    beforeEach(() => {
        process.env = { ...oldEnv };
    });

    afterEach(() => {
        jest.resetModules();
        process.env = oldEnv;
    });

    test('getAlpacaHeaders() correctly populates the headers', async () => {
        const axiosResponse: AxiosResponse = {
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
            return (params: AxiosRequestConfig) => {
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
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca')).default;
        const result: AlpacaBuyResult = await alpaca.buy(buyOrder);
        expect(result.response.headers).toEqual({
            "APCA-API-KEY-ID": 'fake-api-key',
            "APCA-API-SECRET-KEY": 'fake-api-secret',
        });
    });

    test('getAlpacaBaseUrl() correctly populates the live API base URL', async () => {
        process.env.ENV = 'production';

        const axiosResponse: AxiosResponse = {
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
            return (params: AxiosRequestConfig) => {
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
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca')).default;
        const result: AlpacaBuyResult = await alpaca.buy(buyOrder);
        expect(result.response.config.baseURL).toBe('https://live.example.com');
    });

    test('getAlpacaBaseUrl() correctly populates the test API base URL', async () => {
        process.env.ENV = 'development';

        const axiosResponse: AxiosResponse = {
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
            return (params: AxiosRequestConfig) => {
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
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca')).default;
        const result: AlpacaBuyResult = await alpaca.buy(buyOrder);
        expect(result.response.config.baseURL).toBe('https://test.example.com');
    });

    test('buy() processes a BuyOrder and returns a BuyResult', async () => {
        const axiosResponse: AxiosResponse = {
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
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca')).default;
        const result: AlpacaBuyResult = await alpaca.buy(buyOrder);
        expect(result).not.toBeNull();
    });

    test('buy() rejects the promise on error', async () => {
        const axiosResponse: AxiosResponse = {
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
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca')).default;
        return expect(async () => {
            const result: AlpacaBuyResult = await alpaca.buy(buyOrder);
            expect(result).not.toBeNull();
        }).rejects.toThrow('Bad Input');
    });

    test('sell() processes a SellOrder and returns a SellResult', async () => {
        const axiosResponse: AxiosResponse = {
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
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca')).default;
        const result: AlpacaSellResult = await alpaca.sell(sellOrder);
        expect(result).not.toBeNull();
    });

    test('sell() rejects the promise on error', async () => {
        const axiosResponse: AxiosResponse = {
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
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca')).default;
        return expect(async () => {
            const result: AlpacaSellResult = await alpaca.sell(sellOrder);
            expect(result).not.toBeNull();
        }).rejects.toThrow('Bad Input');
    });

    test('getPositions() returns an array of all held securities', async () => {
        const axiosResponse: AxiosResponse = {
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
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca')).default;
        const result: AlpacaPosition[] = await alpaca.getPositions();
        expect(result).not.toBeNull();
        expect(result.length).toBe(3);
    });

    test('getPositions() rejects the promise on error', async () => {
        const axiosResponse: AxiosResponse = {
            data: {},
            status: 400,
            statusText: 'Bad Input',
            headers: {},
            config: {},
        };
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca')).default;
        return expect(async () => {
            const result: AlpacaPosition[] = await alpaca.getPositions();
            expect(result).not.toBeNull();
        }).rejects.toThrow('Bad Input');
    });

    test('getPosition() returns the held position for a given symbol', async () => {
        const axiosResponse: AxiosResponse = {
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
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca')).default;
        const result: AlpacaPosition = await alpaca.getPosition('AAPL');
        expect(result).not.toBeNull();
    });

    test('getPosition() rejects the promise on error', async () => {
        const axiosResponse: AxiosResponse = {
            data: {},
            status: 400,
            statusText: 'Bad Input',
            headers: {},
            config: {},
        };
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca')).default;
        return expect(async () => {
            const result: AlpacaPosition = await alpaca.getPosition();
            expect(result).not.toBeNull();
        }).rejects.toThrow('Bad Input');
    });

    test('getAccountInfo() returns the user\'s account info', async () => {
        const axiosResponse: AxiosResponse = {
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
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca')).default;
        const result: AlpacaAccountInfo = await alpaca.getAccountInfo();
        expect(result).not.toBeNull();
    });

    test('getPositions() rejects the promise on error', async () => {
        const axiosResponse: AxiosResponse = {
            data: {},
            status: 400,
            statusText: 'Bad Input',
            headers: {},
            config: {},
        };
        jest.doMock('axios', () => {
            return () => new Promise(resolve => resolve(axiosResponse));
        });
        alpaca = (await import('../../../../../../../server/src/trade/broker/providers/alpaca/alpaca')).default;
        return expect(async () => {
            const result: AlpacaAccountInfo = await alpaca.getAccountInfo();
            expect(result).not.toBeNull();
        }).rejects.toThrow('Bad Input');
    });
});

export { };
