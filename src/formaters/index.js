import stylish from './stylish.js';
import json from './json.js';
import plain from './plain.js';

export default (formater) => {
  switch (formater && formater.toLowerCase()) {
    case 'json':
      return json;
    case 'plain':
      return plain;
    case 'stylish':
    default:
      return stylish;
  }
};
