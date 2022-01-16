'use strict';
const str = 'TEST STRATEGY';
export default [
    (symbol) => new Promise((resolve, reject) => {
        console.log('first anon (resolve)');
        return resolve(symbol);
    }),
    (symbol) => new Promise((resolve, reject) => {
        console.log('second anon (reject)');
        return reject(symbol);
    }),
    (symbol) => new Promise((resolve, reject) => {
        console.log('third anon (resolve)');
        return resolve(symbol);
    }),
];
