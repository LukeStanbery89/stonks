export default {
    COLORS: {
        ROYAL_PURPLE: '#7851a9',
    },
    MARKET_CAP_SIZES: {
        MEGA: 'MEGA',
        LARGE: 'LARGE',
        MID: 'MID',
        SMALL: 'SMALL',
        MICRO: 'MICRO',
        NANO: 'NANO',
    },
    MARKET_TYPES: {
        CRYPTO: 'CRYPTO',
        STOCK: 'STOCK',
    },
    REGEX: {
        ALPACA_ORDER_TYPES: /^(market|limit|stop|stop_limit|trailing_stop)$/,
        ALPACA_ORDER_SIDES: /^(buy|sell)$/,
        ALPACA_TIMES_IN_FORCE: /^(day|gtc)$/,
        BROKER_PROVIDERS: /^(ALPACA)$/,
        HEX_CODE: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        HTTP_STATUS_CODES: /^[1-5][0-9][0-9]$/,
        MARKET_CAP_SIZES: /^(MEGA|LARGE|MID|SMALL|MICRO|NANO)$/,
        MARKET_TYPES: /^(STOCK|CRYPTO)$/,
    },
    TRADE_UNIT_TYPES: {
        DOLLARS: 'DOLLARS',
        SHARES: 'SHARES',
    },
};