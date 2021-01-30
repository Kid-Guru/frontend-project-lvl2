import path from 'path';
import fs from 'fs';
import getParser from './parsers';

const readFIle = (filePath) => {
  const extnamepath = path.extname(filePath).replace('.', '');
  const parser = getParser(extnamepath);
  // const cwd = process.cwd();
  const pathToFile = path.resolve(filePath);
  const fileDiscriptor = fs.openSync(pathToFile, 'r');
  return parser(fs.readFileSync(fileDiscriptor, 'utf8'));
};
const cheackKey = (key, obj1, obj2, diff) => {
  let diffBuffer = diff;
  const keyExistsInObj1 = (key in obj1);
  const keyExistsInObj2 = (key in obj2);
  if (keyExistsInObj1 && !keyExistsInObj2) {
    diffBuffer[`- ${key}`] = obj1[key];
  } else if (!keyExistsInObj1 && keyExistsInObj2) {
    diffBuffer[`+ ${key}`] = obj2[key];
  } else if (obj1[key] !== obj2[key]) {
    diffBuffer[`- ${key}`] = obj1[key];
    diffBuffer[`+ ${key}`] = obj2[key];
  } else {
    diffBuffer[`  ${key}`] = obj1[key];
  }
  return diffBuffer;
};
const makeDiff = (obj1, obj2) => {
  const keysOfObj1 = Object.keys(obj1).sort();
  const keysOfObj2 = Object.keys(obj2).sort();
  const unicleKeys = new Set([...keysOfObj1, ...keysOfObj2]);
  let diff = {};
  unicleKeys.forEach((key) => { diff = cheackKey(key, obj1, obj2, diff); });
  return JSON.stringify(diff, null, 2).replace(/"/g, '').replace(/,/g, '');
};

export default (filepath1, filepath2) => {
  const obj1 = readFIle(filepath1);
  const obj2 = readFIle(filepath2);
  return makeDiff(obj1, obj2);
};
