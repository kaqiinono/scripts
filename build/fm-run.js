#!/usr/bin/env node

const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const { excute } = require('../shelljs/excute');

let root = process.cwd();
let projectRoot = path.join(root, '../..');

if (argv.package) {
  projectRoot = root;
  root = `${projectRoot}/packages/${argv.package}`;

  if (!fs.existsSync(`${projectRoot}/packages/${argv.package}`)) {
    console.error(`${projectRoot}/packages/${argv.package} 目标目录不存在，请检查!`);
    process.exit(1);
  }
}

console.log('root', root);
console.log('projectRoot', projectRoot);
console.log('env args:', argv);

const include = [root];

if (fs.existsSync(`${projectRoot}/packages/common`)) {
  include.push(`${projectRoot}/packages/common`);
}

if (argv._[0] === 'build') {
  excute(
    `webpack --config webpack/webpack.prod.js --progress --env production root=${root} include=${include}`, {
    cwd: projectRoot
  }
  );


  if (!argv.noPollyfill) {
    // webcomponent兼容性处理，根据loader的前缀组装url，需要跟loader放置在同一文件夹下
    excute(
      `cp -r ${projectRoot}/node_modules/@webcomponents/webcomponentsjs/bundles/* ${root}/dist/chunk`
    );
  }
  if (argv.upload) {
    upload();
  }
} else if (argv._[0] === 'start') {
  excute(
    `webpack serve --progress --open  --config webpack/webpack.dev.js --env root=${root} include=${include}`
    , {
      cwd: projectRoot
    });
} else if (argv._[0] === 'upload') {
  // upload();
} else {
  console.log(`
  fm-run start 启动项目
  fm-run build 编译项目
  fm-run upload 仅上传已打包好的资源到oss，不重新编译
  
  --folder 上传到oss的目标路径
  --package 目标包目录名称
  --noPollyfill 不打包兼容文件，仅测试时使用
  --upload build时使用，打包并自动上传资源
  --bucket oss的bucketName，默认为frameless-ui
  
  注意：fm-run命令在根目录使用时需要package参数

  `);
}
