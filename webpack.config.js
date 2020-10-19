const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './web/index_template.html',
    filename: 'index.html'
});

module.exports = {
    mode: 'development',
    entry: {
        index: './web/static/script/index.js'
    },
    output: {
        filename: 'index_bundle.js',
        path: path.resolve('./web/')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    devServer: {
        inline: true,
        port:8080
    },
    plugins: [HtmlWebpackPluginConfig]
}