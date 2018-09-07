var webpack = require('webpack')
var path = require('path')

module.exports = {
	externals: {
		xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
	},
	resolve: {
		modules: [
			path.resolve(
				__dirname,
				'src'
			),
			'node_modules'
		],
		extensions: [
			'.js',
			'.jsx',
			'.json',
			'.scss',
			'.css',
			'.svg',
			'.icon.svg'
		],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: path.resolve('src'),
				loader:'babel-loader',
				options: {
					cacheDirectory: true
				}
			},
			{ test: /\.icon.svg$/, loader: 'svg-react-loader'},
			{
				test: /\.svg$/,
				use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'svgo-loader',
						options: {
							plugins: [
								{ removeViewBox: false }
							]
						}
          }
        ],
				exclude: /\.(icon.svg)$/
			}
		]
	}
}
