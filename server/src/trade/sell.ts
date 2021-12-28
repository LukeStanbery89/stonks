'use strict';

import Broker from "./broker/Broker";
import { Position, SellResult } from "./types";
const broker = new Broker();
const sellConditions = require('./sell.config.json');

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
    const sellConditionsNotMet = sellConditions.conditions.filter((condition: object) => {
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
