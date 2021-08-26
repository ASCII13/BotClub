const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    publicPath: './',
	assetsDir: 'static',
	productionSourceMap: false,
	devServer: {
		port: 8888,
		proxy: {
			'/api': {
				target: 'https://www.wanandroid.com',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
	css: {
		loaderOptions: {
			scss: {
				prependData: `@import '@/styles/variables.scss';`
			}
		}
	},
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			config.plugins.push(
				new CompressionPlugin({
					// filename: '[path].gz[query]',
					algorithm: 'gzip',
					test: /\.js$|\.html$|\.css$/,
					threshold: 10240,
					minRatio: 0.8,
					deleteOriginalAssets: false
				})
			)
		}
	}
}