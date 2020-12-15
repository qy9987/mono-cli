const chalk = require('chalk');
const { rmdirSync, writeFileSync } = require('fs');
const { stringify } = require('javascript-stringify')
const inquirer = require('inquirer');
module.exports = async function (package) {
  const answer = await inquirer.prompt([{
    type:'confirm',
    message: `确认删除${chalk.yellow(package)}项目?`,
    name: 'confirmDel'
  }])
  if(answer.confirmDel) {
    const config = require(process.cwd()+'/mono.config.js')
    if(!config.apps&&!config.apps instanceof Array) {
      return;
    }
    const index = config.apps.findIndex(i=>i.name==package)
    if(index>-1) {
      config.apps.splice(index, 1);
      if(config.defaultApp==package) {
        config.defaultApp = '';
      }
      rmdirSync(process.cwd()+'/'+config.packagePath+'/'+package, {maxRetries: 5,recursive: true}) 
      writeFileSync(process.cwd()+'/mono.config.js', `module.exports = ${stringify(config, null, 2)}`)
      console.log(chalk.green(` ${package} 子App删除成功`))
    }else {
      console.log(chalk.red(`未找到 ${package} 子App`))
    }
  }
}