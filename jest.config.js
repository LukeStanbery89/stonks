/** @type {import('@jest/types').Config.InitialOptions} */
export default {
    verbose: true,
    testEnvironment: 'node',
    notify: true,
    transform: {},
    moduleNameMapper: {
        './providers/fake-provider/fake-provider': '<rootDir>/test/unit/server/trade/broker/providers/__mocks__/fake-provider.js',
    },
};