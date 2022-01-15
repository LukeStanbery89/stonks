'use strict';

import { jest } from '@jest/globals';

const buy = jest.fn(async () => 'mock return');
const sell = jest.fn(async () => 'mock return');
const getPositions = jest.fn(async () => 'mock return');
const getPosition = jest.fn(async () => 'mock return');
const getAccountInfo = jest.fn(async () => 'mock return');

export {
    buy,
    sell,
    getPositions,
    getPosition,
    getAccountInfo,
};
