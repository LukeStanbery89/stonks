const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [
    {
        name: 'server',
        target: 'node',
        mode: process.env.ENV || 'production',
        entry: {
            server: './server/server.js',
        },
        devtool: 'eval',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: [
                        /node_modules/,
                        path.resolve(__dirname, '/test'),
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.jsx', '.js'],
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            chunkFormat: 'module',
        },
        externals: [
            nodeExternals(), // in order to ignore all modules in node_modules folder
        ],
        experiments: {
            outputModule: true,
        },
    },
];
