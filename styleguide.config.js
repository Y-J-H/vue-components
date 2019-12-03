const path = require('path')

const docSiteUrl =
  process.env.DEPLOY_PRIME_URL || 'https://vue-styleguidist.github.io'

module.exports = {
  jsxInExamples: true,
  simpleEditor: true,
  copyCodeButton: true,
  title: 'Vue Styleguidist jsx example',
  components: 'src/components/**/[A-z]*.js',
  defaultExample: false,
  ribbon: {
    text: 'Back to examples',
    url: `${docSiteUrl}/Examples.html`
  },
  version: '1.1.1',
  require: [path.join(__dirname, 'config/global.requires.js')],
  webpackConfig: Object.assign({}, require('./build/webpack.conf.js')),
  usageMode: 'expand',
  exampleMode: 'expand', // 默认展开
  styleguideDir: 'docs',
  logger: {
    // 打印错误信息
    // One of: info, debug, warn
    // Suppress messages
    info: info => console.info(`NOOOOOO: ${info}`),
    // Override display function
    warn: message => console.warn(`NOOOOOO: ${message}`),
    debug: debug => console.debug(`NOOOOOO: ${debug}`)
  },
  pagePerSection: true // 是否控制每一个组件展示为一个页面
}
