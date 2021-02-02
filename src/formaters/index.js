import stylish from './stylish.js';

export default (formater) => {
  switch (formater) {
    case 'another':
      return null;
    case 'stylish':
    default:
      return stylish;
  }
}