import figlet from 'figlet';

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
    console.log(`PWD: ${process.env.PWD}`);
}
