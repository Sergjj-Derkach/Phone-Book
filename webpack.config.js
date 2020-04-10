const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin }= require('clean-webpack-plugin');


module.exports = {
    mode:'development',
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    'style-loader', 
                    'css-loader'
                ]
            }
        ]
    },
    devtool:'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
};