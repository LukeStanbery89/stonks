const multiply = (a: number, b: number): number => a * b;
const divide = (a: number, b: number): number => a / b;
const add = (a: number, b: number): number => a + b;
const subtract = (a: number, b: number): number => a - b;
const isEven = (a: number): boolean => a % 2 === 0;

module.exports = {
    multiply,
    divide,
    add,
    subtract,
    isEven,
};