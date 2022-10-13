/** @format */

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const buildPath = path.join(__dirname, "/public")
module.exports = {
	mode: "development",
	entry: "./src/index.jsx",
	output: {
		path: buildPath,
		filename: "bundle.js",
		publicPath: "/",
		globalObject: "self",
	},
	devServer: {
		port: 3000,
	},
	module: {
		rules: [
			{
				test: /.(png|jpg|woff|woff2|eot|ttf|svg|gif)$/,
				use: "url-loader?limit=1024000",
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "public"),
		},
		compress: true,
		port: 3000,
		open: true,
		historyApiFallback: true,
	},
	performance: {
		hints: false,
	},
	optimization: {
		splitChunks: {
			minSize: 10000,
			maxSize: 250000,
		},
	},
	resolve: {
		extensions: [".js", ".jsx"],
		modules: ["node_modules"],
		alias: {
			public: path.join(__dirname, "./public"),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "/public/index.html"),
			inject: false,
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].[contenthash].css",
			chunkFilename: "[id].css",
		}),
	],
}
