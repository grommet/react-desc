// array function should not be used here so that we can the local this
const addPropTypeDocumentationField = fieldName => function addFieldToReactDesc(value) {
  if (!this.reactDesc) {
    this.reactDesc = {};
  }
  this.reactDesc[fieldName] = value;
  return this;
};

const documentedPropType = {
  defaultValue: addPropTypeDocumentationField('defaultValue'),
  description: addPropTypeDocumentationField('description'),
  deprecated: addPropTypeDocumentationField('deprecated'),
  format: addPropTypeDocumentationField('format'),
};

const createPropType = (type) => {
  const propTypeObj = {
    type,
    ...documentedPropType,
  };
  Object.defineProperty(
    propTypeObj,
    'isRequired', {
      get: function getRequired() {
        if (!this.reactDesc) {
          this.reactDesc = {};
        }
        this.reactDesc.required = true;
        return this;
      },
      enumerable: true,
      configurable: true,
    },
  );
  return propTypeObj;
};

const createPropTypeWithArgs = type => (args) => {
  const propTypeObj = {
    args,
    type,
    ...documentedPropType,
  };
  Object.defineProperty(
    propTypeObj,
    'isRequired', {
      get: function getRequired() {
        if (!this.reactDesc) {
          this.reactDesc = {};
        }
        this.reactDesc.required = true;
        return this;
      },
      enumerable: true,
      configurable: true,
    },
  );
  return propTypeObj;
};

const PropTypes = {
  custom: (callback) => {
    const target = callback.bind(null);
    target.type = 'func';
    Object.keys(documentedPropType)
      .forEach((fieldName) => { target[fieldName] = documentedPropType[fieldName]; });
    return target;
  },
};

function definePropType(type) {
  Object.defineProperty(
    PropTypes,
    type, {
      get: function getPropType() {
        return createPropType(type);
      },
      enumerable: true,
      configurable: true,
    },
  );
}

function definePropTypeWithArgs(type) {
  Object.defineProperty(
    PropTypes,
    type, {
      get: function getPropType() {
        return createPropTypeWithArgs(type);
      },
      enumerable: true,
      configurable: true,
    },
  );
}

definePropType('any');
definePropType('array');
definePropType('bool');
definePropType('element');
definePropType('func');
definePropType('node');
definePropType('number');
definePropType('object');
definePropType('symbol');
definePropType('string');

definePropTypeWithArgs('arrayOf');
definePropTypeWithArgs('instanceOf');
definePropTypeWithArgs('objectOf');
definePropTypeWithArgs('oneOfType');
definePropTypeWithArgs('oneOf');
definePropTypeWithArgs('shape');

export default PropTypes;
