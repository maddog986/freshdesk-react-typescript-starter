const path = require("path"),
    webpack = require('webpack'),
    TerserPlugin = require('terser-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = (env, options) => {
    const isDev = options.mode === 'development'

    return {
        devtool: isDev ? 'cheap-source-map' : false,

        entry: path.resolve(__dirname, "src", "app", "index.tsx"),

        output: {
            path: path.resolve(__dirname, "app"),
            sourceMapFilename: '[file].map',
            filename: 'index.js'
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss', '.css'],
            modules: ['node_modules'],
        },

        devtool: isDev ? 'source-map' : false,

        plugins: [
            // dump css into its own files
            new MiniCssExtractPlugin({
                filename: 'index.min.css',
            }),

            // build html file
            new HtmlWebPackPlugin({
                template: "./src/app/index.ejs",
                filename: "./index.html"
            }),

        ],

        externals: {
            // jquery is loaded by Freshdesk
            jquery: 'jQuery',
        },

        optimization: {
            minimize: !isDev,
            minimizer: [
                // https://webpack.js.org/plugins/terser-webpack-plugin/
                !isDev && new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
            ].filter(Boolean),
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: "ts-loader",
                    options: {
                        configFile: "tsconfig.client.json"
                    }
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
                {
                    test: /\.html$/,
                    use: 'html-loader',
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: true,
                            },
                        },
                        'css-loader',
                        'sass-loader',
                    ],
                }
            ]
        },
    }
}