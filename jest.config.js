/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    notify: true,
    moduleNameMapper: {
        'trade-config.json': '<rootDir>/test/unit/server/__mocks__/trade-config.json',
    },
};