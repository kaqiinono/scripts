#!/usr/bin/env node

const path = require('path');
const {excute} = require('../shelljs/excute');
const root = process.cwd();

// npm > 7 否则无法创建script
const {stdout} = excute(`npm --version`, {
    silent: true
});
if (stdout && stdout.split('.')[0] < 7) {
    console.log(`npm版本(${stdout.trim()})过低，需要安装最新版本！`)
    console.log('请输入您的开机密码进行授权===>')
    excute(`sudo npm install npm -g`);
}
excute(`npm set-script release "standard-version --dry-run"`);
excute(`npm set-script postinstall "dm-husky"`)

excute(`npm install cz-customizable commitizen @commitlint/{cli,config-conventional} husky lint-staged standard-version prettier eslint-config-prettier eslint-plugin-prettier --save-dev`);
excute(`dm-husky --force --cz`);
excute(`cp -rf ${path.join(__dirname, 'files')}/ ${root}`);
