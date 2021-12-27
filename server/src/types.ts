'use strict';

export type AsyncFunction = (...args: any) => Promise<any>;

export type HttpStatusCode = 100 | 101 | 102 | 200 | 201 | 202 | 203 | 204 |
    205 | 206 | 207 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 |
    401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 |
    414 | 415 | 416 | 417 | 418 | 419 | 420 | 422 | 423 | 424 | 424 | 425 | 426 |
    428 | 429 | 431 | 444 | 449 | 450 | 451 | 494 | 495 | 496 | 497 | 499 | 500 |
    501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 509 | 510 | 511 | 598 | 599;

export type JSObject = {
    [key: string]: any,
};

export type AxiosResponse = {
    data: JSObject,
    status: HttpStatusCode,
    statusText: string,
    headers: JSObject,
    config: JSObject,
    request: JSObject,
};

/***********************************/

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
    notional?: number,
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
    notional?: number,
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

export type Position = {
    id: string,
    symbol: string,
    qty: number,
    market_value: number,
    current_price: number,
    lastday_price?: number,
    change_today?: number,
    broker: string,
    response: JSObject,
};

export type BuyResult = {
    request_id: string,
    symbol: string,
    notional?: number,
    qty: number,
    security_price: number,
    broker: string,
    statusCode: HttpStatusCode,
    statusText: string,
    errors?: string[],
    timestamp?: string,
    response: any,
};

export type SellResult = {
    request_id: string,
    symbol: string,
    notional?: number,
    qty: number,
    security_price: number,
    broker: string,
    statusCode: HttpStatusCode,
    statusText: string,
    errors?: string[],
    timestamp?: string,
    response: any,
};

export interface AccountInfo {
    account_number: string,
    broker: string,
    funds: number,
    response: JSObject,
};

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
