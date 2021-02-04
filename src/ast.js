import findKey from 'lodash/findKey.js';
import isEqual from 'lodash/isEqual.js';
import isObject from 'lodash/isObject.js';
import isArray from 'lodash/isArray.js';

const isObjectAndNotArray = (value1, value2) => (
  isObject(value1) && isObject(value2) && !isArray(value1) && !isArray(value2)
);

const buildAst = (object1, object2, depth = 1) => {
  const combinedKeys = [...Object.keys(object1), ...Object.keys(object2)].concat().sort();
  const unicleKeys = Array.from(new Set(combinedKeys));

  const buildNode = (key, obj1, obj2) => {
    const valueBefore = obj1[key];
    const valueAfter = obj2[key];
    const isKeyInObj1 = key in obj1;
    const isKeyInObj2 = key in obj2;
    const depthNode = depth;

    const nodeStatuses = {
      deleted: { check: isKeyInObj1 === true && isKeyInObj2 === false },
      added: { check: isKeyInObj1 === false && isKeyInObj2 === true },
      unchanged: { check: isEqual(valueBefore, valueAfter) },
      nested: { check: isObjectAndNotArray(valueBefore, valueAfter) },
    };

    const currentNodeStatus = findKey(nodeStatuses, ['check', true]) || 'changed';

    const nodeByStatus = {
      deleted: () => ({
        name: key, status: 'deleted', value: valueBefore, depth: depthNode, children: false,
      }),
      added: () => ({
        name: key, status: 'added', value: valueAfter, depth: depthNode, children: false,
      }),
      nested: () => ({
        name: key,
        status: 'nested',
        depth: depthNode,
        children: buildAst(valueBefore, valueAfter, depthNode + 1),
      }),
      changed: () => ({
        name: key,
        status: 'changed',
        valueOld: valueBefore,
        value: valueAfter,
        depth: depthNode,
        children: false,
      }),
      unchanged: () => ({
        name: key,
        status: 'unchanged',
        value: valueAfter,
        depth: depthNode,
        children: false,
      }),
    };
    return nodeByStatus[currentNodeStatus]();
  };

  return unicleKeys.map((key) => buildNode(key, object1, object2));
};

export default buildAst;
