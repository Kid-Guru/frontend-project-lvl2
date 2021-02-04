import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../src/gendiff.js';

const getPath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return path.join(__dirname, '..', '__fixtures__', filename);
};
const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf-8');

const extensionsWithFormats = [
  ['json', 'stylish'], ['json', 'plain'], ['json', 'json'],
  ['yaml', 'stylish'], ['yaml', 'plain'], ['yaml', 'json'],
];

test.each(extensionsWithFormats)(
  'Input %s, %s output',
  (ext, format) => {
    const fixturesPathBefore = getPath(`before.${ext}`);
    const fixturesPathAfter = getPath(`after.${ext}`);
    const diff = gendiff(`${fixturesPathBefore}`, `${fixturesPathAfter}`, format);
    expect(diff).toMatch(readFile(`expected_${format}.txt`));
  },
);
