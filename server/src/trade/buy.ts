import { BuyResult } from "../types";

const buySymbols = (): BuyResult[] => {
    const symbolsToBuy = getBuyableSymbols();
    return symbolsToBuy.map(buy);
};

const getBuyableSymbols = (): string[] => {
    // TODO
    return [];
};

const buy = (symbol: string): BuyResult => {
    // TODO
    return {};
};

module.exports = {
    buySymbols,
};
