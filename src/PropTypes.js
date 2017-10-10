const reactDescApiFunctions = [
  'description',
  'deprecated',
  'format',
  'defaultProp',
];
const handler = {
  get: (target, prop) => {
    /* eslint-disable no-param-reassign */
    if (!target.reactDesc) {
      target.reactDesc = {};
    }
    if (reactDescApiFunctions.indexOf(prop) >= 0) {
      return (value) => {
        target.reactDesc[prop] = value;
        return new Proxy(target, handler);
      };
    } else if (prop === 'isRequired') {
      target.reactDesc.required = true;
      return new Proxy(target, handler);
    }
    /* eslint-enable no-param-reassign */
    return target[prop];
  },
};

const createProxyFunc = type => args => new Proxy(
  { type, args, isRequired: { type, args, required: true } }, handler,
);

export default new Proxy({
  any: { type: 'any', isRequired: { type: 'any', required: true } },
  array: { type: 'array', isRequired: { type: 'array', required: true } },
  bool: { type: 'bool', isRequired: { type: 'bool', required: true } },
  element: { type: 'element', isRequired: { type: 'element', required: true } },
  func: { type: 'func', isRequired: { type: 'func', required: true } },
  node: { type: 'node', isRequired: { type: 'node', required: true } },
  number: { type: 'number', isRequired: { type: 'number', required: true } },
  object: { type: 'object', isRequired: { type: 'object', required: true } },
  string: { type: 'string', isRequired: { type: 'string', required: true } },
  symbol: { type: 'symbol', isRequired: { type: 'symbol', required: true } },
  arrayOf: createProxyFunc('arrayOf'),
  custom: (callback) => {
    const target = callback.bind(null);
    target.type = 'func';
    return new Proxy(target, handler);
  },
  instanceOf: createProxyFunc('instanceOf'),
  objectOf: createProxyFunc('objectOf'),
  oneOfType: createProxyFunc('oneOfType'),
  oneOf: createProxyFunc('oneOf'),
  shape: createProxyFunc('shape'),
}, {
  get: (target, prop) => (
    new Proxy(typeof target[prop] === 'object' ? { ...target[prop] } : target[prop], handler)
  ),
});
