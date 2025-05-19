const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'textures/[name][ext]'
                }
            }
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
            publicPath: '/',
        },
        compress: true,
        port: 8080,
        open: true,
        hot: true,
        historyApiFallback: true,
    },
    mode: 'development',
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'textures'), // Source folder (project root/textures)
                    to: path.resolve(__dirname, 'public/textures') // Destination folder (public/textures)
                },
            ],
        }),
    ],
};


