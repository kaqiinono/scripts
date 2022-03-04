#!/usr/bin/env node

const path = require("path");
const { excute } = require("../shelljs/excute");
const { existsSync } = require("fs");
const walk = require("walk");

const root = process.cwd();

console.log("检测路径：", root);

/**
 * 检查husky是否初始化，否则重新初始化
 */
if (!existsSync(path.resolve(root, ".husky/_"))) {
  excute(`npx dm-husky`);
}

try {
  dependencyChecker();
  configChecker();
} catch (e) {
  console.error("package.json 检测失败！");
  console.error(e);
}

console.log("完成检测！");

/**
 * 检查依赖是否都已安装，否则重新安装
 */
function dependencyChecker() {
  const { devDependencies } = require(path.join(root, "package.json"));
  const dKeys = Object.keys(devDependencies);
  const dep = [ "cz-customizable", "commitizen", "@commitlint/cli", "@commitlint/cli", "husky", "lint-staged", "standard-version" ];
  const depNeedInstall = dep.filter(d => !dKeys.includes(d));
  if (depNeedInstall.length > 0) {
    excute(`npm install ${depNeedInstall.join(" ")}  --save-dev`);
  }
}

/**
 * 检查配置文件是否已添加，否则重新添加
 */
function configChecker() {
  const walker = walk.walk(path.resolve(__dirname, "files"));
  walker.on("file", function(configFolder, fileStats, next) {
    const fileName = fileStats.name;
    const fileExist = existsSync(path.resolve(root, fileName));
    if (!fileExist) {
      excute(`cp ${configFolder}/${fileName} ${root}`);
      console.log(`配置文件${fileName}已添加！`);
    }
    next();
  });
}
