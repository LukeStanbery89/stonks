'use strict';

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const port = 3000;
import { buySymbols } from './src/trade/buy/buy.js';

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Web app listening at http://localhost:${port}`);
    console.log(`env: ${process.env.ENV}`);
    buySymbols();
});
