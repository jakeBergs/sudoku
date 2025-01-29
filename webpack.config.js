const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/frontend/main.tsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist/frontend'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/frontend/index.html',
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist/frontend'),
        },
        compress: true,
        port: 9000,
    },
    mode: 'development',
};