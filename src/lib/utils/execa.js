const chalk = require('chalk');
const execa = require('execa');
module.exports = function (command, { args=[], opts= {}}) {
  return new Promise((resolve, reject)=> {
    try {
      const child = execa(command, args, {stdio: 'inherit', ...opts});
    child.on('close',(code)=> {
      if(code!==0){
        console.log(chalk.redBright(`${command} ${args.join(' ')} 执行失败`))
        reject(child.stderr);
      }
      else 
        resolve();
    })
    child.on('error', (err)=> {
      reject(err)
    })
    } catch (error) {
      reject(error)
    }
  })
} 