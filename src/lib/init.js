const {
  copyDir
} = require('./utils/fs');
const {
  writeFileSync,
  renameSync
} = require('fs');
const execa = require('./utils/execa')
const {
  join
} = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const {stringify} = require('javascript-stringify')
module.exports = async function (dir) {
  try {
    const answer = await inquirer.prompt([{
      name: "dirName",
      type: "input",
      default: dir,
      message: '项目名称'
    }, {
      name: "packageAddress",
      type: "input",
      default: 'packages',
      message: 'packages存储地址'
    },{
      name: "typescript",
      type: "confirm",
      message: '是否使用typescript模板？'
    }])
    const packagePath = process.cwd() + `/${answer.dirName}/package.json`;
    const lernaPath = process.cwd() + `/${answer.dirName}/lerna.json`;
    const monoPath = `${process.cwd()}/${answer.dirName}/mono.config.js`;
    const bool = await copyDir(join(__dirname + '/../template/'+(answer.typescript?'ts':'js')), answer.dirName);
    if (bool) {
      if (answer.packageAddress !== 'packages') {
        renameSync(`${answer.dirName}/packages`, `${answer.dirName}/${answer.packageAddress}`)
      }
      // 写入mono 配置
      const config = require(monoPath);
      config.packagePath = answer.packageAddress;
      config.typescript = answer.typescript;
      writeFileSync(monoPath, `module.exports = ${stringify(config, null, 2)};\n`)
      // 写入lerna和package配置
      const dirPackage = require(packagePath);
      const dirLerna = require(lernaPath);
      dirPackage.name = answer.dirName;
      dirPackage.workspaces = [`${answer.packageAddress}/*`];
      dirLerna.packages = [`${answer.packageAddress}/*`];
      writeFileSync(lernaPath, JSON.stringify(dirLerna, null, 2))
      writeFileSync(packagePath, JSON.stringify(dirPackage, null, 2))
      try {
        await execa('yarn', {opts: {cwd: answer.dirName ,stdio: 'inherit'}})
        // await execa('npx', {args: ['lerna', 'bootstrap'], opts: {cwd: answer.dirName, stdio: 'inherit'}})
        console.log(`成功创建项目 ${chalk.blueBright(answer.dirName)}`);
        console.log('请依次运行下以下命令启动项目');
        console.log(`1. ${chalk.greenBright('cd')} ${chalk.blueBright(answer.dirName)}`);
        console.log(`2. ${chalk.greenBright('mono')} ${chalk.blueBright('serve')}`);
      } catch (error) {
        console.log(error);
      }
    }else {
      console.log(chalk.red('mono程序创建失败，请重试'));
    }
  } catch (error) {
    console.log(error);
  }
}