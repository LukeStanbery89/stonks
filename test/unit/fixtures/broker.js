export const getOrdersResponse = [
    {
        broker: 'ALPACA',
        orderId: 'abc123',
        submittedAt: '2021-03-16T18:38:01.937734Z',
        symbol: 'ABC',
        notional: NaN,
        qty: 1,
        type: 'market',
        side: 'buy',
    },
    {
        broker: 'ALPACA',
        orderId: 'def456',
        submittedAt: '2021-03-16T18:38:01.937734Z',
        symbol: 'DEF',
        notional: NaN,
        qty: 2,
        type: 'limit',
        side: 'sell',
    },
];

export const newProcessingContext = {
    history: [],
    orders: getOrdersResponse,
};
