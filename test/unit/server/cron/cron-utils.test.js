import {
    evenMinutes,
    getBuyCronTabSchedule,
    marketDaysOfWeek,
    marketHours,
    oddMinutes,
} from '../../../../server/src/cron/cron-utils';

const oldEnv = process.env;

describe('Cron Utils', () => {
    beforeEach(() => {
        process.env = { ...oldEnv };
    });

    afterEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
        process.env = oldEnv;
    });

    test('getBuyCronTabSchedule() returns the correctly formatted crontab string in production', () => {
        process.env.ENV = 'production';
        expect(getBuyCronTabSchedule()).toBe('*/2 9-15 * * 1-5');
    });

    test('getSellCronTabSchedule() returns the correctly formatted crontab string in development', () => {
        process.env.ENV = 'development';
        expect(getBuyCronTabSchedule()).toBe('*/2 * * * *');
    });

    test('evenMinutes() returns the crontab formatted string for every even-numbered minute', () => {
        expect(evenMinutes()).toBe('*/2');
    });

    test('oddMinutes() returns the crontab formatted string for every odd-numbered minute', () => {
        expect(oddMinutes()).toBe('1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59');
    });

    test('marketHours() returns the correct market hours in production', () => {
        process.env.ENV = 'production';
        expect(marketHours()).toBe('9-15');
    });

    test('marketHours() returns * in development', () => {
        process.env.ENV = 'development';
        expect(marketHours()).toBe('*');
    });

    test('marketDaysOfWeek() returns weekdays in production', () => {
        process.env.ENV = 'production';
        expect(marketDaysOfWeek()).toBe('1-5');
    });

    test('marketDaysOfWeek() returns * in development', () => {
        process.env.ENV = 'development';
        expect(marketDaysOfWeek()).toBe('*');
    });
});
