import cron from 'node-cron';
import * as buy from '../trade/buy/buy.js';
import * as sell from '../trade/sell/sell.js';

export function scheduleCronJobs() {
    console.log('Scheduling cron jobs...');
    cron.schedule(getBuyCronTabSchedule(), async () => {
        const result = await sell.run();
        console.log('sell result: ', result);
    });
    cron.schedule(getSellCronTabSchedule(), async () => {
        const result = await buy.run();
        console.log('buy result: ', result);
    });
}

export function getBuyCronTabSchedule() {
    return `${evenMinutes()} ${marketHours()} * * ${marketDaysOfWeek()}`;
}

export function getSellCronTabSchedule() {
    return `${oddMinutes()} ${marketHours()} * * ${marketDaysOfWeek()}`;
}

export function evenMinutes() {
    return '*/2';
}

export function oddMinutes() {
    return [...Array(60).keys()].filter(n => n % 2).join(',');
}

export function marketHours() {
    return process.env.ENV === 'development' ? '*' : '9-3';
}

export function marketDaysOfWeek() {
    return process.env.ENV === 'development' ? '*' : '1-5';
}
