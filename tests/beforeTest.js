/*
 * @Author: your name
 * @Date: 2020-08-26 10:22:46
 * @LastEditTime: 2020-08-27 14:47:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \weath\tests\beforeTest.js
 */
/*
 *           佛曰:
 *                   写字楼里写字间，写字间里程序员；
 *                   程序人员写程序，又拿程序换酒钱。
 *                   酒醒只在网上坐，酒醉还来网下眠；
 *                   酒醉酒醒日复日，网上网下年复年。
 *                   但愿老死电脑间，不愿鞠躬老板前；
 *                   奔驰宝马贵者趣，公交自行程序员。
 *                   别人笑我忒疯癫，我笑自己命太贱；
 *                   不见满街漂亮妹，哪个归得程序员？
 */

/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const { execSync } = require('child_process')
const { join } = require('path')
const findChrome = require('carlo/lib/find_chrome')
const detectInstaller = require('detect-installer')

const installPuppeteer = () => {
  // find can use package manger
  const packages = detectInstaller(join(__dirname, '../../'))
  // get installed package manger
  const packageName = packages.find(detectInstaller.hasPackageCommand) || 'npm'
  console.log(`🤖 will use ${packageName} install puppeteer`)
  const command = `${packageName} ${
    packageName.includes('yarn') ? 'add' : 'i'
  } puppeteer`
  execSync(command, {
    stdio: 'inherit',
  })
}

const initPuppeteer = async () => {
  try {
    // eslint-disable-next-line import/no-unresolved
    const findChromePath = await findChrome({})
    const { executablePath } = findChromePath
    console.log(`🧲 find you browser in ${executablePath}`)
    return
  } catch (error) {
    console.log('🧲 no find chrome')
  }

  try {
    require.resolve('puppeteer')
  } catch (error) {
    // need install puppeteer
    await installPuppeteer()
  }
}

initPuppeteer()
