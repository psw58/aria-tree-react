const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'app.jsx'),
    output: {
        path: path.resolve(__dirname, './output'),
        filename: 'app.bundle.js',
        sourceMapFilename: 'app.bundle.js.map'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.resolve(__dirname, 'src', 'js'),
            environment: path.resolve(__dirname, 'src', 'environment'),
            styles: path.resolve(__dirname, 'src', 'css'),
        },
    },
    devServer: {
        contentBase: './src',
        publicPath: '/output',
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'
                ]
            }
        ]
    }
}