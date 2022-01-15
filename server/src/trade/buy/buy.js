'use strict';

import Broker from "../broker/Broker";
const broker = new Broker();
import tradeConfig from '../trade.config.json';

const buySymbols = () => {
    return getBuyableSymbols().map(buy);
};

const getBuyableSymbols = () => {
    // TODO
    return [];
};

const buy = async (symbol) => {
    return await broker.buy({
        symbol,
        qty: tradeConfig.tradeQty,
    });
};

export {
    buySymbols,
};
