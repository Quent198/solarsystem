const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: 'src', // prevent display of src/ in filename
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        static: path.join(__dirname, 'public'),
        compress: true,
        port: 9000,
    },
};


