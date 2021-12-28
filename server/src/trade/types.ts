import { HttpStatusCode, JSObject } from "../types";

export type BuyOrder = {
    symbol: string,
    qty: number,
};

export type SellOrder = {
    symbol: string,
    qty: number,
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

export type AccountInfo = {
    account_number: string,
    broker: string,
    funds: number,
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
