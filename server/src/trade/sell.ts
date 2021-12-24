'use strict';

import { Position, SellResult } from "../types";
const sellConditions = require('./sell.config.json');

const sellPositions = (): Position[] => {
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

const sellPosition = (position: Position): SellResult => {
    // TODO
    return {};
};

module.exports = {
    sellPositions,
};
