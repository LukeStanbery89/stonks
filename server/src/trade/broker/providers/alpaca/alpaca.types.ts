import { AccountInfo, BuyResult, Position, SellResult } from "../../../trade.types";
import { BrokerProvider } from "../../broker.types";

export interface AlpacaProvider extends BrokerProvider {
    getSecurities: () => Promise<AlpacaAsset[]>,
}

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

export interface AlpacaAsset {
    id: string,
    class: "us_equity",
    exchange: AlpacaExchange,
    symbol: string,
    name: string,
    status: "active" | "inactive",
    tradable: boolean,
    marginable: boolean,
    shortable: boolean,
    easy_to_borrow: boolean,
    fractionable: boolean,
}

export type AlpacaOrderStatus = 'new' | 'partially_filled' | 'filled' | 'done_for_day' |
    'canceled' | 'expired' | 'replaced' | 'pending_cancel' | 'pending_replace';

export type AlpacaExchange = "AMEX" | "ARCA" | "BATS" | "NYSE" | "NASDAQ" | "NYSEARCA";