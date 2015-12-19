#!/usr/bin/env node
/*
 * -h, --help
 * -v, --version
 * -s, --string
 * path
 * desPath
 */

var program = require('commander');
var doDiff = require('./diff.js');
 
program
  .version(require('./package.json').version)
  .option('-o, --oripath [original Path]', 'original path', '')
  .option('-b, --basepath [base Path]', 'base path', '')
  .option('-e, --extension [extension name]', 'jade|json|js', '*')
  .parse(process.argv);

if (program.oripath && program.basepath){
    doDiff(program.oripath, program.basepath, program.extension);   
}