import { program } from 'commander';
import path from 'path';
import fs from 'fs';

const readJSON = (filePath) => {
  // const cwd = process.cwd();
  const pathToFile = path.resolve(filePath);
  const fileDiscriptor = fs.openSync(pathToFile, 'r');
  const obj = JSON.parse(fs.readFileSync(fileDiscriptor, 'utf8'));
  return obj;
};
const cheackKey = (key, obj1, obj2, diff) => {
  let diffBuffer = diff;
  const keyExistsInObj1 = (key in obj1);
  const keyExistsInObj2 = (key in obj2);
  if (keyExistsInObj1 && !keyExistsInObj2) {
    diffBuffer += `\n  - ${key}: ${obj1[key]}`;
  } else if (!keyExistsInObj1 && keyExistsInObj2) {
    diffBuffer += `\n  + ${key}: ${obj2[key]}`;
  } else if (obj1[key] !== obj2[key]) {
    diffBuffer += `\n  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
  }
  return diffBuffer;
};
const makeDiff = (obj1, obj2) => {
  const keysOfObj1 = Object.keys(obj1).sort();
  const keysOfObj2 = Object.keys(obj2).sort();
  const unicleKeys = new Set([...keysOfObj1, ...keysOfObj2]);
  let diff = '';
  unicleKeys.forEach((key) => { diff = cheackKey(key, obj1, obj2, diff); });
  diff = `{${diff}\n}`;
  return diff;
};

export default () => {
  let diff = '';
  program.version('0.0.1');
  program
    .name('gendiff')
    .usage('[options] <filepath1> <filepath2>')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
      const obj1 = readJSON(filepath1);
      const obj2 = readJSON(filepath2);
      diff = makeDiff(obj1, obj2);
    });

  program.parse(process.argv);
  return diff;
};
