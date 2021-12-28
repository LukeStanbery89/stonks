import { AccountInfo, BuyOrder, BuyResult, Position, SellOrder, SellResult } from "../types";

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
