const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');

module.exports = {
    entry : path.resolve(__dirname,'public') + '/client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'public')
    },
    module : {
        rules : [
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:[ {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-react'],
                      plugins: ['@babel/plugin-syntax-jsx']
                    }
                }],
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: '/',
                        
                    },
                }],
            },
        ]
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
 
    ],
    mode :  'production',
    watch : devMode,
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    
};
