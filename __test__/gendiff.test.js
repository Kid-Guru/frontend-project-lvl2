import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../src/gendiff.js';

const getPath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return path.join(__dirname, '..', '__fixtures__', filename);
};
const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf8');

let path1;
let path2;
let expectedString;

beforeAll(() => {
  path1 = getPath('file1.json');
  path2 = getPath('file2.json');
  expectedString = readFile('expected_file.txt');
});

test('Comparing flat files', () => {
  expect(gendiff(path1, path2)).toEqual(expectedString);
});
