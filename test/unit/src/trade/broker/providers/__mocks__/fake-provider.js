import { jest } from '@jest/globals';

const buy = jest.fn(async (args) => args);
const sell = jest.fn(async (args) => args);
const getPositions = jest.fn(async (args) => args);
const getPosition = jest.fn(async (args) => args);
const getAccountInfo = jest.fn(async (args) => args);

export {
    buy,
    sell,
    getPositions,
    getPosition,
    getAccountInfo,
};
