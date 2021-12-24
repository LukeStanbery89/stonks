'use strict';

export type AsyncFunction = (...args: any) => Promise<any>;

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

// TODO: Make this generic
export type BuyOrder = {
    symbol: string,
    qty: number,
    notional?: string,
    side?: string,
    type?: string,
    time_in_force?: string,
    limit_price?: number,
    stop_price?: number,
    trail_price?: number,
    trail_percent?: number,
    extended_hours?: boolean,
    client_order_id?: string,
    order_class?: string,
    take_profile?: {
        limit_price: number,
    },
    stop_loss?: {
        stop_price: number,
        limit_price: number,
    },
};

// TODO: Make this generic
export type SellOrder = {
    symbol: string,
    qty: number,
    notional?: string,
    side?: string,
    type?: string,
    time_in_force?: string,
    limit_price?: number,
    stop_price?: number,
    trail_price?: number,
    trail_percent?: number,
    extended_hours?: boolean,
    client_order_id?: string,
    order_class?: string,
    take_profile?: {
        limit_price: number;
    },
    stop_loss?: {
        stop_price: number,
        limit_price: number,
    },
};

// TODO
export type Position = {};

// TODO
export type BuyResult = {};

// TODO
export type SellResult = {};

// TODO
export type AccountInfo = {};

export type BuyFunction = (buyOrder: BuyOrder) => Promise<BuyResult>;
export type SellFunction = (sellOrder: SellOrder) => Promise<SellResult>;
export type GetAccountInfoFunction = () => Promise<AccountInfo>;
export type GetPositionsFunction = () => Promise<Position[]>;
export type GetPositionFunction = (symbol: string) => Promise<Position>;

export type BrokerProvider = {
    buy: BuyFunction,
    sell: SellFunction,
    getAccountInfo: GetAccountInfoFunction,
    getPositions: GetPositionsFunction,
    getPosition: GetPositionFunction,
};
