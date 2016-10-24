export default {
  any: { type: 'any' },
  array: { type: 'array' },
  bool: { type: 'bool' },
  element: { type: 'element' },
  func: { type: 'func' },
  node: { type: 'node' },
  number: { type: 'number' },
  object: { type: 'object' },
  string: { type: 'string' },
  symbol: { type: 'symbol' },
  arrayOf: args => ({ type: 'arrayOf', args }),
  instanceOf: args => ({ type: 'instanceOf', args }),
  objectOf: args => ({ type: 'objectOf', args }),
  oneOfType: args => ({ type: 'oneOfType', args }),
  oneOf: args => ({ type: 'oneOf', args }),
  shape: args => ({ type: 'shape', args }),
};