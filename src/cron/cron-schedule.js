import cron from 'node-cron';
import * as buy from '../trade/buy/buy.js';
import * as sell from '../trade/sell/sell.js';
import { getBuyCronTabSchedule, getSellCronTabSchedule } from './cron-utils.js';

export default function scheduleCronJobs() {
    console.log('Scheduling cron jobs...');
    cron.schedule(getSellCronTabSchedule(), async () => {
        const result = await sell.run();
        console.log('sell result: ', result);
    });
    cron.schedule(getBuyCronTabSchedule(), async () => {
        const result = await buy.run();
        console.log('buy result: ', result);
    });
}
