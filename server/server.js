import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import scheduleCronJobs from './src/cron/cron-schedule';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Web app listening at http://localhost:${port}`);
    console.log(`ENV: ${process.env.ENV}`);
    console.log(`PWD: ${process.env.PWD}`);
    scheduleCronJobs();
});
