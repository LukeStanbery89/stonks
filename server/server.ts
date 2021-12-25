'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req: any, res: any) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Web app listening at http://localhost:${port}`);
    console.log(`env: ${process.env.ENV}`);
});
