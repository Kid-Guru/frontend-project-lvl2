#!/usr/bin/env node
import program from 'commander';
import gendiff from '../src/gendiff.js';

program.version('1.0.0');
program
  .name('gendiff')
  .usage('[options] <filepath1> <filepath2>')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const { format } = program.opts();
    console.log(gendiff(filepath1, filepath2, format));
  });

program.parse(process.argv);
