const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name : 'rsp-setting',
    mode : 'development', // 실서비스: production
    devtool : 'eval', 
    resolve : {
        extensions : ['.js', '.jsx']
    },
    entry : {
        app : ['./client'],
    },
    module : {
        rules : [{
            test : /\.jsx?/,
            loader : 'babel-loader',
            options : {
                presets : [
                    ['@babel/preset-env', {
                        targets : ['> 1% in KR', 'last 2 chrome versions'],
                        debug : true,
                    }, '@babel/preset-react'],
                ],
                plugins : [
                    'react-refresh/babel'
                ],
            },
            exclude : path.join(__dirname, 'node_modules'),
        }]
    },
    plugins : [
        new RefreshWebpackPlugin(),
    ],
    output : {
        filename: '[name].js',
        publicPath : '/dist/',
        path : path.join(__dirname, 'dist'),
    },
    devServer : {
        devMiddleware : { publicPath : '/dist/' },
        static : { directory : path.resolve(__dirname) },
        hot : true,
    },
}