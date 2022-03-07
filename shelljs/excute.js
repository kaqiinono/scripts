#!/usr/bin/env node

const shell = require('shelljs');
const root = process.cwd();

function excute(cmd, opt) {
  const { stdout, stderr, code } = shell.exec(
    cmd, {
      cwd: root,
      ...opt
    } );
  // if (code === 0) {
  //   console.log(stdout);
  // } else {
  //   console.log(stdout);
  //   console.log(stderr);
  //   // process.exit(1);
  // }
  return { stdout, stderr, code }
}


module.exports = {
  excute
};
