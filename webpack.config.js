const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const title = 'React RTE';
const favicon = '../public/favicon.ico';

const fileIncludes = [
  path.resolve(__dirname, 'src'),
  path.resolve(__dirname, 'node_modules/exscudo-ui/src'),
  path.resolve(__dirname, '../Exscudo-UI/src'),
];

module.exports = function() {

  const htmlWebpackPluginOptions = {
    favicon,
    title,
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
    },
  };

  const config = {
    mode: 'development',

    context: path.join(__dirname, '/src/'),

    entry: {
      app: ['./index'],
    },

    // node: { fs: 'empty' },

    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '',
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
    },

    resolve: {
      extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
      modules: ['node_modules', path.resolve(__dirname, 'src')]
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            'react-hot-loader/webpack',
            'babel-loader'
          ],
          include: fileIncludes,
        },
        {
          test: /\.tsx?$/,
          include: fileIncludes,
          use: [
            'react-hot-loader/webpack',
            'ts-loader'
          ]
        },
        {
          test: /\.css$/,
          include: /src/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
                hmr: true,
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                // minimize: false,
                modules: {
                  localIdentName: '[name]__[local]__[hash:base64:5]'
                },
              }
            },
            { loader: 'postcss-loader'},
          ]
        },
        {
          test: /\.scss$/,
          include: fileIncludes,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../',
                hmr: true,
              }
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: true,
                modules: true,
                // minimize: false,
                modules: {
                  localIdentName: '[name]__[local]__[hash:base64:5]',
                  localIdentContext: __dirname,
                },
              }
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
            }
          ]
        },
        {
          test: /\.svg$/,
          include: fileIncludes,
          use: [
            `svg-sprite-loader?${JSON.stringify({
              name: '[name].[hash]',
              prefixize: true,
            })}`,
            `svgo-loader?${JSON.stringify({
              plugins: [
                { removeTitle: true },
                { convertPathData: false },
                { removeUselessStrokeAndFill: true },
              ],
            })}`,
          ],

        },
      ]
    },

    devServer: {
      contentBase: path.resolve(__dirname, './dist'),
      open: true,
      compress: true,
      hot: true,
      port: 8080,
      historyApiFallback: true,
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].css',
        ignoreOrder: true,
      }),

      /* new HtmlWebpackPlugin({
        template: 'index.ejs',
        inject: 'body',
        ...htmlWebpackPluginOptions,
      }), */

      // new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  };

  return config;
};
