import _ from 'lodash';

// const stringify = (str) => (typeof str === 'string' ? str.replace(/(^")|("$)/g, '') : str);
const stringify = (str) => str.replace(/"/g, '').replace(/,/g, '');
const getIndent = (nodeType, depth) => {
  const defaultIndent = ' '.repeat(4 * depth);
  const nestedIndent = ' '.repeat(depth === 1 ? 2 : 3 * depth + depth - 2);
  return nodeType === 'unchanged' || nodeType === 'nested' ? defaultIndent : nestedIndent;
};
const renderValue = (item, depth) => {
  const indent = ' '.repeat(4 * (depth + 1));
  const bracketsIndent = ' '.repeat(4 * depth);
  if (_.isArray(item)) {
    const processedArray = item.map((el) => `${indent}${el}`).join('\n');
    return `[\n${processedArray}\n${bracketsIndent}]`;
  }
  if (_.isObject(item)) {
    const renderObj = ([key, value]) => `${indent}${key}: ${_.isObject(value) ? renderValue(value, depth + 1) : value}`;
    const processedColl = Object.entries(item).map(renderObj).join('\n');
    // const processedColl = Object.entries(item).map(([key, value]) => {
    //   return `${indent}${key}: ${stringify(JSON.stringify(value, null, indent.repeat(2)))}`
    // }).join('\n');
    return `{\n${processedColl}\n${bracketsIndent}}`;
  }
  return stringify(JSON.stringify(item));
};

const stylish = (ast) => {
  const iterAst = (tree) => tree.map((node) => {
    const {
      name, status, depth, valueOld, value, children,
    } = node;
    const renderNode = () => {
      const indent = getIndent(status, depth);
      const nodeByNodeStatus = {
        added: () => `${indent}+ ${name}: ${renderValue(value, depth)}`,
        deleted: () => `${indent}- ${name}: ${renderValue(value, depth)}`,
        changed: () => `${indent}- ${name}: ${renderValue(valueOld, depth)}\n${indent}+ ${name}: ${renderValue(value, depth)}`,
        unchanged: () => `${indent}${name}: ${renderValue(value, depth)}`,
        nested: () => `${indent}${name}: {\n${iterAst(children, depth + 1)}\n${indent}}`,
      };
      return nodeByNodeStatus[status]();
    };
    return renderNode(status);
  }).join('\n');
  return `{\n${iterAst(ast)}\n}`;
};

export default stylish;
