'use strict';

import Broker from "../broker/Broker";
import { BuyResult } from "../trade.types";
const broker = new Broker();
const { TRADE_QTY } = require('../trade.config.json');

const buySymbols = (): Promise<BuyResult>[] => {
    return getBuyableSymbols().map(buy);
};

const getBuyableSymbols = (): string[] => {
    // TODO
    return [];
};

const buy = async (symbol: string): Promise<BuyResult> => {
    return await broker.buy({
        symbol,
        qty: TRADE_QTY,
    });
};

module.exports = {
    buySymbols,
};
