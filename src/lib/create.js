
const {mkdirSync ,writeFileSync} = require('fs');
const { stringify }  = require('javascript-stringify');
const { copyDir, hasFile } = require('./utils/fs');
const execa = require('./utils/execa');
const inquirer = require('inquirer');
const fs = require('./utils/fs');
const {red} = require('chalk');
const chalk = require('chalk');
const log = console.log;
module.exports = async function create(dir) {
  if(!await hasFile('mono.config.js')){
    log(red('该目录下没有mono配置文件，无法执行 create 命令'))
    return;
  }
  
  const config = require(process.cwd()+'/mono.config.js')
  const haveDir = await hasFile(config.packagePath)
  if(!haveDir) {
    mkdirSync(config.packagePath);
  }
  const val = await inquirer.prompt([{
    name: "projectName",
    type: "input",
    default: dir,
    message: `项目名称`
  },{
    name: "port",
    type: "input",
    message: '请输入项目端口,请不要选择常用端口，以免出现经常修改端口的情况',
    validate(val) {
      if (val === "") return "项目端口不能为空";
      else if(/^[0-9]*$/.test(val)) return true
      else return '项目端口只能为number'
    }
  },{
    name: "activeRule",
    type: "input",
    default: '/'+dir,
    message: `项目路由为 /${dir}?`
  },{
    name: "typescript",
    type: "confirm",
    default: config.typescript,
    message: '项目是否采用typescript?'
  },{
    name: "history",
    type: "confirm",
    message: '是否使用history模式?'
  }]);
  if(!config.apps&&!config.apps instanceof Array) {
    config.apps = [];
  } 
    config.apps.push({
      name: val.projectName,
      host: 'localhost',
      port: val.port,
      activeRule: val.activeRule,
      history: val.history
    });
    writeFileSync(process.cwd()+'/mono.config.js', `module.exports = ${stringify(config, null, 2)}`)
  const bool = await copyDir(__dirname+`/../template/${val.typescript?'ts':'js'}/packages/sub-app`, `${config.packagePath}/${dir}`)
  if(bool) {
    const dirPackage = require(process.cwd()+`/${config.packagePath}/${dir}/package.json`)
    dirPackage.name = dir;
    writeFileSync(process.cwd()+`/${config.packagePath}/${dir}/package.json`, JSON.stringify(dirPackage, null, 2))
    try {
      await execa('yarn', {opts: {cwd:`${config.packagePath}/${dir}`}})
      console.log(` ${chalk.green(val.projectName)} 子App创建成功`);
    } catch (error) {
     console.log(error); 
    }
  }else {
    console.log(chalk.red('子App创建失败，请重试'));
  }
}