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

let beforeJSON;
let afterJSON;
let expectedString;
let beforeYAML;
let afterYAML;

beforeAll(() => {
  beforeJSON = getPath('before.json');
  afterJSON = getPath('after.json');
  expectedString = readFile('expected_file.txt');
  beforeYAML = getPath('before.yaml');
  afterYAML = getPath('after.yaml');
});

test('Comparing flat json files', () => {
  expect(gendiff(beforeJSON, afterJSON)).toEqual(expectedString);
});

test('Comparing flat yaml files', () => {
  expect(gendiff(beforeYAML, afterYAML)).toEqual(expectedString);
});
