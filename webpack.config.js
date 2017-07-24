module.exports = {
	devtool: 'source-map',
	entry: __dirname + "/js/main.js",
	output: {
		path: __dirname + "/js",
		filename: "index.js"
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{ test: /\.less$/, loader: 'style-loader!css-loader!postcss-loader!less-loader' }
		]
	}
}

//devtool: 'eval-source-map',发布，devtool: 'source-map'开发调试