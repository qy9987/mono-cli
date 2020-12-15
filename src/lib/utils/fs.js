const fs = require('fs');
const path = require('path');
async function copyDir(src, dest) {
  if (fs.existsSync(dest) == false) {
    fs.mkdirSync(dest);
  }
  if (fs.existsSync(src) == false) {
    return Promise.resolve(false);
  }
  // console.log("src:" + src + ", dest:" + dest);
  // 拷贝新的内容进去
  const dirs = fs.readdirSync(src);
  for(let item of dirs) {
    const item_path = path.join(src, item);
    const temp = fs.statSync(item_path);
    if (temp.isFile()) { // 是文件
      // console.log("Item Is File:" + item);
      fs.copyFileSync(item_path, path.join(dest, item));
    } else if (temp.isDirectory()) { // 是目录
      // console.log("Item Is Directory:" + item);
      try {
        await copyDir(item_path, path.join(dest, item));
      } catch (error) {
        return Promise.resolve(false);
      }
    }
  }
  return Promise.resolve(true);
}
function hasFile(dirname) {
  try {
    fs.accessSync(dirname);
    return Promise.resolve(true)
  } catch {
    return Promise.resolve(false)
  }
}
module.exports = {
  hasFile,
  copyDir
}