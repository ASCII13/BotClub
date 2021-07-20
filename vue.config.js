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
	}
}