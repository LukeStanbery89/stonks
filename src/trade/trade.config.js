export default {
    broker: 'ALPACA',
    brokerProviders: {
        ALPACA: 'alpaca'
    },
    whitelist: [],
    blacklist: [
        'PYPL'
    ],
    tradeAmount: 10.00,
    tradeQty: 1,
    maxSymbolsPerJob: 10,
    tradeUnit: 'DOLLARS',
    defaultOrderType: 'market',
    timeInForce: 'gtc',
};
