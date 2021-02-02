#!/usr/bin/env node
import { program } from 'commander';
import gendiff from '../src/gendiff.js';

program.version('0.0.1');
program
  .name('gendiff')
  .usage('[options] <filepath1> <filepath2>')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  });

program.parse(process.argv);
