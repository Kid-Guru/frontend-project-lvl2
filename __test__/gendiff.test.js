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
let notFlatbeforeJSON;
let notFlatafterJSON;
let notFlatExpectedString;

beforeAll(() => {
  beforeJSON = getPath('before.json');
  afterJSON = getPath('after.json');
  expectedString = readFile('expected_file.txt');
  beforeYAML = getPath('before.yaml');
  afterYAML = getPath('after.yaml');
  notFlatbeforeJSON = getPath('notFlatBefore.json');
  notFlatafterJSON = getPath('notFlatAfter.json');
  notFlatExpectedString = readFile('notFlatExpected_file.txt');
});

test('Comparing flat json files', () => {
  expect(gendiff(beforeJSON, afterJSON)).toEqual(expectedString);
});

test('Comparing flat yaml files', () => {
  expect(gendiff(beforeYAML, afterYAML)).toEqual(expectedString);
});

test('Comparing notFlat json files', () => {
  expect(gendiff(notFlatbeforeJSON, notFlatafterJSON)).toEqual(notFlatExpectedString);
});
