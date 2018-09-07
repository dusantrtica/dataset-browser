const path = require('path')
const express = require('express')
const app = express()

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
if (isDev) {
	const webpack = require('webpack')
	const webpackDevMiddleware = require('webpack-dev-middleware')
	const webpackHotMiddleware = require('webpack-hot-middleware')
	const DashboardPlugin = require('webpack-dashboard/plugin')
	const config = require('./webpack.config.development')
	const compiler = webpack(config)
	compiler.apply(new DashboardPlugin({
		minified: false,
		gzip: false
	}))
	app.use(webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath,
		headers: { 'Access-Control-Allow-Origin': '*' },
		stats: {
			colors: true,
		},
		historyApiFallback: true,
	}))
	app.use(webpackHotMiddleware(compiler))
	app.use(express.static('dist'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(`${__dirname}/src/index.html`))
	})

} else {
	app.use(express.static('dist'))
	app.get('/bundleReport', (req, res) => {
		res.sendFile('report.html', {
			root: path.join(__dirname, 'dist'),
		})
	})
}

app.listen(8000, () => console.log('App listening on port 8000!'))
