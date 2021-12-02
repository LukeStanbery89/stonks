const { describe, it } = require('@jest/globals');
const {
    multiply,
    divide,
    add,
    subtract,
    isEven
} = require('../../../server/src/delete-me');

describe('@deleteMe@', () => {

    it('5 * 2 = 10', () => {
        expect(multiply(5, 2)).toBe(10);
    });

    it('25 / 5 = 5', () => {
        expect(divide(25, 5)).toBe(5);
    });

    it('5 + 10 = 15', () => {
        expect(add(5, 10)).toBe(15);
    });

    it('15 - 10 = 5', () => {
        expect(subtract(15, 10)).toBe(5);
    });

    it('20 is even', () => {
        expect(isEven(20)).toBe(true);
    });

    it('25 is not even', () => {
        expect(isEven(25)).toBe(false);
    });
});