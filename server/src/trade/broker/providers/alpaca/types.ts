import { AccountInfo, BuyResult, Position, SellResult } from "../../../../trade/types";

export interface AlpacaAccountInfo extends AccountInfo {
    broker: 'ALPACA',
    pattern_day_trader: boolean,
}

export interface AlpacaBuyResult extends BuyResult {
    broker: 'ALPACA',
}

export interface AlpacaSellResult extends SellResult {
    broker: 'ALPACA',
}

export interface AlpacaPosition extends Position {
    broker: 'ALPACA',
}
