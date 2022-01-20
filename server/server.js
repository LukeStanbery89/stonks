'use strict';

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const port = 3000;
import cron from 'node-cron';
import * as buy from './src/trade/buy/buy.js';
import * as sell from './src/trade/sell/sell.js';

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Web app listening at http://localhost:${port}`);
    console.log(`env: ${process.env.ENV}`);
    cron.schedule('*/2 * * * *', () => {
        sell.run();
    });
    cron.schedule(`${oddMinutes()} * * * *`, () => {
        buy.run();
    });
});

function oddMinutes() {
    return [...Array(60).keys()].filter(n => n % 2).join(',');
}