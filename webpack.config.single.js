/* eslint-disable import/unambiguous */
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './src/main/browser-index.js',
	output: {
		library: 'JsonUrl',
		libraryTarget: 'umd',
		libraryExport: 'default',
		filename: 'json-url-single.js',
		path: __dirname + '/dist/browser'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						babelrc: false,
						presets: ['es2015', 'stage-0'],
						plugins: [
							'syntax-dynamic-import',
							['module-resolver',
								{
									root: ["src"],
									alias: {
										lzma: require.resolve('lzma/src/lzma_worker-min'),
										bluebird: require.resolve('bluebird/js/browser/bluebird.core.min.js')
									}
								}
							],
							'transform-runtime',
						]
					}
				}
			}
		],
	},
	plugins: [
		new UglifyJSPlugin({
			comments: false
		}),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		})
	]
};