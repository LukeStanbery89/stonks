import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { showStartupOutput } from './bin/server-utils';
import scheduleCronJobs from './src/cron/cron-schedule';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, async () => {
    await showStartupOutput(`http://localhost:${port}`);
    scheduleCronJobs();
});
