import yaml from 'js-yaml';

const mapping = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  yml: yaml.safeLoad,
};

export default (dataType) => mapping[dataType];
