'use strict';

import { AccountInfo, BrokerProvider, BuyOrder, BuyResult, Position, SellOrder, SellResult } from "../../../types";

const buy = async (buyOrder: BuyOrder): Promise<BuyResult> => {
    return new Promise((resolve, reject) => {
        // TODO
        console.log('ALPACA buyOrder: ', buyOrder);
        return resolve({});
    });
};

const sell = async (sellOrder: SellOrder): Promise<SellResult> => {
    return new Promise((resolve, reject) => {
        // TODO
        console.log('ALPACA sellOrder: ', sellOrder);
        return resolve({});
    });
};

const getPositions = async (): Promise<Position[]> => {
    return new Promise((resolve, reject) => {
        // TODO
        console.log('ALPACA getPositions');
        return resolve([{}]);
    });
};

const getPosition = async (): Promise<Position> => {
    return new Promise((resolve, reject) => {
        // TODO
        console.log('ALPACA getPositions');
        return resolve({});
    });
};

const getAccountInfo = async (): Promise<AccountInfo> => {
    return new Promise((resolve, reject) => {
        // TODO
        console.log('ALPACA getAccountInfo');
        return resolve({});
    });
};

const exports: BrokerProvider = {
    buy,
    sell,
    getAccountInfo,
    getPositions,
    getPosition,
};

export default exports;
