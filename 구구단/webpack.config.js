const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name : 'gugudan-setting',
    mode : 'development', // 실서비스 : production
    devtool : 'eval', // 실전 : hidden-source-map
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
                        }
                    }],
                '@babel/preset-react'],
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
        path : path.join(__dirname, 'dist'),
        filename : '[name].js',
        publicPath : '/dist',
    }, 
    devServer : {
        devMiddleware : {publicPath : '/dist'},
        static : {directory : path.resolve(__dirname)},
        hot : true,
    }
}