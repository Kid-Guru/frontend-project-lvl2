import isObject from 'lodash/isObject.js';
import isArray from 'lodash/isArray.js';
import isString from 'lodash/isString.js';

const outputTemplates = {
  added: ({ name, value }) => `Property '${name.join('.')}' was added with value: ${value}`,
  deleted: ({ name }) => `Property '${name.join('.')}' was removed`,
  changed: ({ name, valueOld, value }) => `Property '${name.join('.')}' was updated. From ${valueOld} to ${value}`,
};
const checkStatus = (status) => {
  if (status === 'added'
    || status === 'deleted'
    || status === 'changed') {
    return true;
  }
  return false;
};
const prettyValue = (value) => {
  if (isObject(value) || isArray(value)) return '[complex value]';
  if (isString(value)) return `'${value}'`;
  return value;
};

const plain = (ast) => {
  const plainOutput = [];
  const iter = (tree, name) => tree.forEach((node) => {
    const nestedName = [...name, node.name];
    if (checkStatus(node.status) === true) {
      const template = outputTemplates[node.status];
      const value = prettyValue(node.value);
      const valueOld = prettyValue(node.valueOld);
      const render = template({
        ...node, name: nestedName, value, valueOld,
      });
      plainOutput.push(render);
    }
    if (node.children !== false) {
      iter(node.children, nestedName);
    }
  });
  iter(ast, []);
  return plainOutput.join('\n');
};

export default plain;
