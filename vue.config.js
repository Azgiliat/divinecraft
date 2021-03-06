const path = require('path')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('st', path.resolve(__dirname, 'src/static'));
    ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach(rule => {
      config.module
        .rule('scss')
        .oneOf(rule)
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
          patterns: [
            path.resolve(__dirname, 'src/assets/css/index.scss')
          ]
        })
        .before('resolve-url-loader')
        .end()
        .use('resolve-url-loader')
        .loader('resolve-url-loader')
        .options({
          removeCR: true,
          sourceMap: true
        })
        .before('sass-loader')
        .end()
        .use('sass-loader')
        .loader('sass-loader')
        .tap(options => ({ ...options, sourceMap: true }))
    })
    config.module.rule('svg')
      .test(/\.svg$/)
      .exclude
      .add(path.resolve(__dirname, 'src/assets/icons'))
      .end()
    config.module.rule('svg-sprite')
      .test(/\.svg$/)
      .include
      .add(path.resolve(__dirname, 'src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .options({
        plugins: [
          {
            cleanupIDs: {
              minify: false
            }
          },
          {
            removeViewBox: false
          },
          {
            removeAttributesBySelector: {
              selectors: [
                {
                  selector: ['svg'],
                  attributes: ['width', 'height']
                },
                {
                  selector: ['svg:not(.goodFill) *'],
                  attributes: ['fill']
                },
                {
                  selector: ['svg:not(.goodFill)'],
                  attributes: ['fill']
                }
              ]
            }
          }]
      })
    config.module
      .rule('lint')
      .test(/\.js$/)
      .pre()
      .include
      .add(path.resolve(__dirname, 'src'))
      .end()
      .use('eslint')
      .loader('eslint-loader')
    if (process.env.NODE_ENV === 'production') {
      config.plugin('imagemin')
        .use(ImageminPlugin, [{
          test: /\.(jpe?g|png)$/i,
          pngquant: {
            speed: 10,
            quality: '30-50'
          },
          plugins: [
            imageminMozjpeg({
              quality: 100,
              progressive: true
            })
          ]
        }])
    }
    if (process.env.NODE_ENV === 'development') {
      config.plugin('html')
        .tap(args => {
          args[0].devtools = '<script src="http://localhost:8098"></script>'

          return [
            ...args
          ]
        })
    }
    config.plugin('stylelint')
      .use(StyleLintPlugin, [{
        files: ['src/**/*.{vue,htm,html,css,sss,less,scss,sass}'],
        fix: true
      }])
  }
}
