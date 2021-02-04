import isObject from 'lodash/isObject.js';
import isArray from 'lodash/isArray.js';
import isString from 'lodash/isString.js';

const prettyValue = (value) => {
  if (isObject(value) || isArray(value)) return '[complex value]';
  if (isString(value)) return `'${value}'`;
  return value;
};

const plain = (ast) => {
  const iter = (tree, name) => tree.flatMap((node) => {
    const nestedName = [...name, node.name];
    const value = prettyValue(node.value);
    const valueOld = prettyValue(node.valueOld);
    switch (node.status) {
      case ('added'):
        return `Property '${nestedName.join('.')}' was added with value: ${value}`;
      case ('deleted'):
        return `Property '${nestedName.join('.')}' was removed`;
      case ('changed'):
        return `Property '${nestedName.join('.')}' was updated. From ${valueOld} to ${value}`;
      case ('nested'):
        return iter(node.children, nestedName);
      case ('unchanged'):
      default:
        return [];
    }
  });
  return iter(ast, []).join('\n');
};

export default plain;
