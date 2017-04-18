import PropTypes from 'prop-types';

function getArgs(args) {
  return args.map((arg) => {
    if (arg.type && PropTypes[arg.type]) {
      if (arg.args) {
        return PropTypes[arg.type](arg.args);
      }
      return PropTypes[arg.type];
    }
    return arg;
  });
}

function getPropType(validate) {
  return PropTypes[validate.type](
    validate.args.type && PropTypes[validate.args.type] ?
      PropTypes[validate.args.type] : validate.args
  );
}

// function to recursively build the proptype for shape
function buildShapePropType(validate) {
  const args = {};
  Object.keys(validate.args).forEach((arg) => {
    const element = validate.args[arg];
    if (element.type && PropTypes[element.type]) {
      if (element.args) {
        if (element.type === 'oneOfType') {
          const elementArgs = getArgs(element.args);
          args[arg] = PropTypes[element.type](elementArgs);
        } else if (element.type === 'shape') {
          args[arg] = buildShapePropType(element);
        } else {
          args[arg] = getPropType(element);
        }
      } else {
        args[arg] = PropTypes[element.type];
      }
    } else if (element.type) {
      throw new Error(`docPropType: unknown type ${element.type}`);
    }
  });

  return PropTypes[validate.type](args);
}

export default function docPropType(validate, description, options = {}) {
  if (!description) {
    throw new Error(
      'docPropType: description is required'
    );
  }
  if (!validate) {
    throw new Error('docPropType: validate is required');
  }

  const { required } = options;
  let type = validate;
  if (validate.type && PropTypes[validate.type]) {
    if (validate.args) {
      if (validate.type === 'oneOfType') {
        const args = getArgs(validate.args);
        type = PropTypes[validate.type](args);
      } else if (validate.type === 'shape') {
        type = buildShapePropType(validate);
      } else {
        type = getPropType(validate);
      }
    } else {
      type = PropTypes[validate.type];
    }
  } else if (validate.type) {
    throw new Error(`docPropType: unknown type ${validate.type}`);
  }
  // clone function
  let propType = type.bind(null);
  if (type.isRequired) {
    propType.isRequired = type.isRequired.bind(null);
  }
  if (required && propType.isRequired) {
    propType = propType.isRequired;
  }
  propType.$$reactDesc = { description, validate, options };
  return propType;
}
