import figlet from 'figlet';

export async function showStartupOutput(appUrl) {
    console.log(figlet.textSync(process.env.npm_package_name.toUpperCase(), {
        font: 'Big Money-nw',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }));
    console.log(`Web app listening at ${appUrl}`);
    console.log(`ENV: ${process.env.ENV}`);
    console.log(`PWD: ${process.env.PWD}`);
}
