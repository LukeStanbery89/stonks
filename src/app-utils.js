import chalk from 'chalk';
import figlet from 'figlet';
import constants from './constants';

export async function showStartupOutput(appUrl) {
    console.log(figlet.textSync('STONKS', {
        font: 'Big Money-nw',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }));
    console.log(`App listening at ${appUrl}`);
    console.log(`ENV: ${process.env.ENV}`);
}

export function logVerbose(...data) {
    if (process.env.VERBOSE) {
        const formattedData = data.map(datum => {
            return JSON.stringify(datum);
        });
        console.log(chalk.hex(constants.COLORS.ROYAL_PURPLE)('VERBOSE '), ...formattedData);
    }
}
