import { AccountInfo, BuyResult, Position, SellResult } from "../../../../trade/types";

export interface AlpacaAccountInfo extends AccountInfo {
    broker: 'ALPACA',
    pattern_day_trader: boolean,
}

export interface AlpacaBuyResult extends BuyResult {
    broker: 'ALPACA',
    statusText: AlpacaOrderStatus,
}

export interface AlpacaSellResult extends SellResult {
    broker: 'ALPACA',
}

export interface AlpacaPosition extends Position {
    broker: 'ALPACA',
}

export type AlpacaOrderStatus = 'new' | 'partially_filled' | 'filled' | 'done_for_day' |
    'canceled' | 'expired' | 'replaced' | 'pending_cancel' | 'pending_replace';