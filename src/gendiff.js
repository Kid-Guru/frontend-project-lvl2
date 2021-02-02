import path from 'path';
import fs from 'fs';
import getParser from './parsers.js';
import makeAst from './ast.js';
import stylish from './formaters/stylish.js';

const readFIle = (filePath) => {
  const extnamepath = path.extname(filePath).replace('.', '');
  const parser = getParser(extnamepath);
  const pathToFile = path.resolve(filePath);
  const fileDiscriptor = fs.openSync(pathToFile, 'r');
  return parser(fs.readFileSync(fileDiscriptor, 'utf8'));
};

export default (filepath1, filepath2) => {
  const obj1 = readFIle(filepath1);
  const obj2 = readFIle(filepath2);
  const ast = makeAst(obj1, obj2);
  // console.log(util.inspect(ast, { showHidden: false, depth: null }));
  const diff = stylish(ast);
  return diff;
  // JSON.stringify(ast, null, 2).replace(/"/g, '').replace(/,/g, '');
};
