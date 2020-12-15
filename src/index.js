#!/usr/bin/env node

const program = require('commander');
const create = require('./lib/create');
const init = require('./lib/init');
const remove = require('./lib/remove');
const execa = require('./lib/utils/execa');
const {version} = require('../package.json');
const chalk = require('chalk');
const which = require('which');
const { hasFile } = require('./lib/utils/fs');
console.log('mono cli '+chalk.green('v' + version))
console.log(`mono ${chalk.blueBright('cli')} v${version}`)


program.version(`mono cli ${require('../package.json').version}`).usage('<command> [options]')
program
  .command('init <dir>')
  .description('初始化一个monoRepo程序')
  .action(async (dir) => {
    init(dir);
  })
program
  .command('create <projectName>')
  .description('创建一个monoRepo Package')
  .action((dir) => {
    create(dir)
  })
program
  .command('remove <projectName>')
  .description('删除一个monoRepo Package')
  .action((dir) => {
    remove(dir)
  })
program
  .command('serve [projectName]')
  .description('TODO')
  .action(async (projectName, cmd, pros) => {
    if(!await hasFile('mono.config.js')){
      log(red('该目录下没有mono配置文件，无法执行 create 命令'))
      return;
    }
    if(!pros||pros.length==0) {
      pros = [];
    }
    pros.unshift(projectName);
    const projects = [];
    if(pros.length>1) {
      const config = require(`${process.cwd()}/${answer.dirName}/mono.config.js`);
      projects.push('--scope', config.main||'main')
      pros.forEach(pro => {
        projects.push('--scope', pro)
      });
    }
    try {
      await execa('npx',{args: ['lerna', 'run',...projects, 'serve', '--stream', '--sort']})
    } catch (error) {
      console.log(error);
    }
  })
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
    suggestCommands(cmd)
    process.exitCode = 1
  })
// 解析进程参数
program.parse(process.argv)
// 存在command 时打印输出
if (!process.argv.slice(2).length) {
  program.outputHelp()
}