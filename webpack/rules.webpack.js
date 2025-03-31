const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
module.exports = [
    {
        test: /\.node$/,
        use: 'node-loader',
    },
    {
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
            loader: '@marshallofsound/webpack-asset-relocator-loader',
            options: {
                outputAssetBase: 'native_modules',
            },
        },
    },
    {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    },
    {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]',
        },

    },
    // {
    //     test: /\.scss$/,
    //     use: [
    //         'style-loader',
    //         'css-loader',
    //         'sass-loader'
    //     ]
    // },
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader',
            'postcss-loader'
        ]
    }
]