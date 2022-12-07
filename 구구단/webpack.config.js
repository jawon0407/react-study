const path = require('path');

module.exports = {
    name : 'gugudan-setting',
    mode : 'development', // 실서비스 : production  
    devtool : 'eval',// 실서비스 : hidden-source-map
    resolve : {
        extensions: ['.jx', '.jsx']
    },
    entry:{
        app: ['./client.jsx']
    },
    module : {
        rules:[{
            test : /\.jsx?/,
            loader : 'babel-loader',
            options : {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties']
            }
        }],
    },
    output:{
        path : path.join(__dirname, 'dist'),
        filename : 'app.js'
    }
}