export type Source = {
    name: string,
    url: string,
    selectors: {
        row: string,
        rating: string,
        symbol: string,
        drillDownLink: string,
    },
    constants: {
        BULLISH: string,
        NEUTRAL: string,
        BEARISH: string,
    };
};

export type BuyOrder = {
    symbol: string,
    qty: number,
    notional: string,
    side: string,
    type: string,
    time_in_force: string,
    limit_price: number,
    stop_price: number,
    trail_price: number,
    trail_percent: number,
    extended_hours: boolean,
    client_order_id: string,
    order_class: string,
    take_profile: {
        limit_price: number,
    },
    stop_loss: {
        stop_price: number,
        limit_price: number,
    },
};

// TODO
export type Position = {};

// TODO
export type SellResult = {};

// TODO
export type BuyResult = {};
