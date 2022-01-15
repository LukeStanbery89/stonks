'use strict';

import Broker from "../broker/Broker";
const broker = new Broker();
import sellConfig from './sell.config.json';

const sellPositions = () => {
    const positions = getPositions();
    const positionsToSell = positions.filter(isPositionSellable);
    return positionsToSell.map(sellPosition);
};

const getPositions = () => {
    // TODO
    return [];
};

const isPositionSellable = (position) => {
    const sellConditionsNotMet = sellConfig.conditions.filter((condition) => {
        // TODO
        return true || false;
    });
    return sellConditionsNotMet.length > 0;
};

const sellPosition = async (position) => {
    const { symbol, qty } = position;
    return await broker.sell({ symbol, qty });
};

export {
    sellPositions,
};
