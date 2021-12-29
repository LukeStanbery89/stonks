'use strict';

import Broker from "../broker/Broker";
import { Position, SellResult } from "../trade.types";
const broker = new Broker();
const sellConfig = require('./sell.config.json');

const sellPositions = (): Promise<SellResult>[] => {
    const positions = getPositions();
    const positionsToSell = positions.filter(isPositionSellable);
    return positionsToSell.map(sellPosition);
};

const getPositions = (): Position[] => {
    // TODO
    return [];
};

const isPositionSellable = (position: Position): boolean => {
    const sellConditionsNotMet = sellConfig.conditions.filter((condition: object) => {
        // TODO
        return true || false;
    });
    return sellConditionsNotMet.length > 0;
};

const sellPosition = async (position: Position): Promise<SellResult> => {
    const { symbol, qty } = position;
    return await broker.sell({ symbol, qty });
};

module.exports = {
    sellPositions,
};
