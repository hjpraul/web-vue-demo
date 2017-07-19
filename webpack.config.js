var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/client/app/index.js',
		login: './src/client/login/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [{
			test: /\.vue$/,
			use: ['vue-loader']
		},
		{	
			test: /\.js$/,
			use: ['babel-loader'],
			exclude: /node_modules/
		},
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		},
		{
			test: /\.html$/,
			use: [{
				loader: 'html-loader',
				options: {
					root: path.resolve(__dirname, 'src'),
					attrs: ['img:src', 'link:href']
				}
			}]
		},
		{
	        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
	        exclude: /favicon\.png$/,
	        use: [{
	          loader: 'url-loader',
	          options: {
	            limit: 10000
	          }
	        }]
	    }]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'app/index.html',
  			template: './src/client/app/index.html',
  			inject: true,
  			chunksSortMode: 'dependency',
  			chunks: [ 'manifest', 'vendor', 'app' ],
  			hash: true 
		}),
		new HtmlWebpackPlugin({
			filename: 'login/index.html',
  			template: './src/client/login/index.html',
  			inject: true,
  			chunksSortMode: 'dependency',
  			chunks: [ 'manifest', 'vendor', 'login' ],
  			hash: true 
		})
	],
	devServer: {
	    host: 'localhost',
	    port: 8020
	},
}
