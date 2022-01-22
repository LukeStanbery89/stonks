import cron from 'node-cron';
import scheduleCronJobs from '../../../../server/src/cron/cron-schedule';

jest.mock('node-cron');

const schedule = jest.fn();

describe('Cron Scheduler', () => {
    beforeAll(() => {
        cron.schedule.mockImplementation(schedule);
    });

    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    test('scheduleCronJobs() initializes node-cron jobs', () => {
        scheduleCronJobs();
        expect(schedule).toHaveBeenCalledTimes(2);
    });
});
