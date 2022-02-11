export default {
    REGEX: {
        ALPACA_ORDER_TYPES: /^(market|limit|stop|stop_limit|trailing_stop)$/,
        ALPACA_ORDER_SIDES: /^(buy|sell)$/,
        BROKER_PROVIDERS: /^(ALPACA)$/,
        HTTP_STATUS_CODES: /^[1-5][0-9][0-9]$/,
        MARKET_CAP_SIZES: /^(MEGA|LARGE|MID|SMALL|MICRO|NANO)$/,
    }
};
