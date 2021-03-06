import cron from 'node-cron';

jest.mock('node-cron');

const schedule = jest.fn((cronTabSchedule, callback) => {
    callback();
});
const mockBuyRun = jest.fn();
const mockBuyModule = {
    run: mockBuyRun,
};
const mockSellRun = jest.fn();
const mockSellModule = {
    run: mockSellRun,
};
const mockGetBuyCronTabSchedule = jest.fn(() => '0 0 31 12 6');
const mockGetSellCronTabSchedule = jest.fn(() => '0 0 31 12 6');
const mockCronUtils = {
    getBuyCronTabSchedule: mockGetBuyCronTabSchedule,
    getSellCronTabSchedule: mockGetSellCronTabSchedule,
};
let scheduleCronJobs;

describe('Cron Scheduler', () => {
    beforeAll(async () => {
        console.log = jest.fn();
        jest.doMock('../../../../src/trade/buy/buy.js', () => mockBuyModule);
        jest.doMock('../../../../src/trade/sell/sell.js', () => mockSellModule);
        jest.doMock('../../../../src/cron/cron-utils.js', () => mockCronUtils);

        scheduleCronJobs = (await import('../../../../src/cron/cron-schedule')).default;
    });

    beforeEach(() => {
        cron.schedule.mockImplementation(schedule);
    });

    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    test('scheduleCronJobs() calls', () => {
        scheduleCronJobs();
        expect(schedule).toHaveBeenCalledTimes(2);
        expect(mockGetBuyCronTabSchedule).toHaveBeenCalled();
        expect(mockGetSellCronTabSchedule).toHaveBeenCalled();
        expect(mockBuyRun).toHaveBeenCalled();
        expect(mockSellRun).toHaveBeenCalled();
    });
});
