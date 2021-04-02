/*
 * @Author: your name
 * @Date: 2020-08-26 10:22:43
 * @LastEditTime: 2020-09-14 15:56:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \weath\config\proxy.js
 */
/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  // dev: {
  //   '/testApi/': {
  //     //liuliang本地服务
  //     target: 'http://172.28.129.58:8581',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/testApi': '',
  //     },
  //     // '/testApi/': {//开发环境
  //     //   target: 'http://192.168.22.47:8765',
  //     //   changeOrigin: true,
  //     //   pathRewrite: {
  //     //     '^/testApi': '',
  //     //   },
  //   },
  // },
  dev: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
}
