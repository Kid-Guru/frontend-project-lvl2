import path from 'path';
import fs from 'fs';
import getParser from './parsers.js';
import makeAst from './ast.js';
import getFormatter from './formaters/index.js';

const readFIle = (filePath) => {
  const extnamepath = path.extname(filePath).replace('.', '');
  const parser = getParser(extnamepath);
  const pathToFile = path.resolve(filePath);
  const fileDiscriptor = fs.openSync(pathToFile, 'r');
  return parser(fs.readFileSync(fileDiscriptor, 'utf8'));
};

export default (filepath1, filepath2, format) => {
  const obj1 = readFIle(filepath1);
  const obj2 = readFIle(filepath2);
  const ast = makeAst(obj1, obj2);
  const formater = getFormatter(format);
  const diff = formater(ast);
  return diff;
};
