#!/usr/bin/env node

const shell = require('shelljs');
const root = process.cwd();

function excute(cmd, opt, callback) {
  const { stdout, stderr, code } = shell.exec(
    cmd, {
      cwd: root,
      ...opt
    } );
  if (code === 0) {
    console.log(stdout);
    // process.exit(0);
    callback && callback()
  } else {
    console.log(stdout);
    console.log(stderr);
    console.log('done!')
    // process.exit(1);
  }
}


module.exports = {
  excute
};
