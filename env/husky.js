#!/usr/bin/env node

const path = require('path');
const { excute } = require('../shelljs/excute');
const { existsSync } = require('fs');
const args = require('minimist')(process.argv.slice(2));

const root = process.cwd();

if (existsSync(path.resolve(root, '.husky/_')) && args.force !== true) {
  console.info('husky exists,jump to next step!');
} else {
  console.info('husky env begin to set:');
  // excute(`npm cache clear --force`);
  excute(`rm -rf ${path.resolve(root, '.husky')}`);
  excute('npx husky install');
  excute(`sh ${path.join(__dirname, 'husky.sh')}`);
}
