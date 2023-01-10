const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name : '지뢰찾기-setting',
    mode : 'development', // 실서비스 : production
    devtool : 'eval',
    resolve : {
        extensions : ['.js', '.jsx']
    },
    entry : {
        app : './client',
    },
    module : {
        rules : [{
            test : /\.jsx?/,
            loader : 'babel-loader',
            options : {
                presets : [['@babel/preset-env',{
                    targets : {
                        browsers : ['> 1% in KR', 'last 2 chrome versions'],
                        },
                    debug : true,
                    }],
                '@babel/preset-react'],
                plugins : [
                    'react-refresh/babel'
                ],
            },
            exclude : path.join(__dirname, 'node_modules'),
        }],
    },
    plugins: [
        new RefreshWebpackPlugin(),
    ],
    output : {
        path : path.join(__dirname, 'dist'),
        filename : '[name].js',
        publicPath : '/dist',
    },
    devServer : {
        hot : true,
        devMiddleware : {publicPath : '/dist'},
        static : {directory : path.resolve(__dirname)},
    }
}