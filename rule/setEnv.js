#!/usr/bin/env node

const path = require('path');
const { excute } = require('../shelljs/excute');
const root = process.cwd();

// npm > 7 否则无法创建script
excute(`npm install npm -g`,{},()=>{
    excute(`npm set-script release "standard-version --dry-run"`);
    excute(`npm set-script postinstall "dm-husky"`)
    excute(`npm install commitizen @commitlint/{cli,config-conventional} husky lint-staged standard-version --save-dev`);
    excute(`sh ${path.join(__dirname, 'setEnv.sh')}`);
    excute(`cp -rf ${path.join(__dirname, 'files')}/ ${root}`);
}); // npm>7,否则无法添加scripts
