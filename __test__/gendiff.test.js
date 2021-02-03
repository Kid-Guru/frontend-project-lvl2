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
let beforeYAML;
let afterYAML;
let expectedStylish;
let expectedJSON;
let expectedPlain;

beforeAll(() => {
  beforeJSON = getPath('before.json');
  afterJSON = getPath('after.json');
  beforeYAML = getPath('before.yaml');
  afterYAML = getPath('after.yaml');
  expectedStylish = readFile('expected_Stylish.txt');
  expectedJSON = readFile('expected_JSON.txt');
  expectedPlain = readFile('expected_Plain.txt');
});
test('Input JSON. Stylish output', () => {
  expect(gendiff(beforeJSON, afterJSON)).toEqual(expectedStylish);
});
test('Input YAML. Stylish output', () => {
  expect(gendiff(beforeYAML, afterYAML)).toEqual(expectedStylish);
});
test('Input JSON. JSON output', () => {
  expect(gendiff(beforeJSON, afterJSON, 'json')).toEqual(expectedJSON);
});
test('Input JSON. Plain output', () => {
  expect(gendiff(beforeJSON, afterJSON, 'plain')).toEqual(expectedPlain);
});
