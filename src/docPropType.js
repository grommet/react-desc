import { PropTypes } from 'react';

// function to recursively build the proptype for shape
function buildShapePropType(validate) {
  const args = {};
  Object.keys(validate.args).forEach((arg) => {
    const element = validate.args[arg];
    if (element.type && PropTypes[element.type]) {
      if (element.args) {
        if (element.type === 'oneOfType') {
          const elementArgs = element.args.map((currentArg) => {
            if (currentArg.type && PropTypes[currentArg.type]) {
              if (currentArg.args) {
                return PropTypes[currentArg.type](currentArg.args);
              }
              return PropTypes[currentArg.type];
            }
            return currentArg;
          });
          args[arg] = PropTypes[element.type](elementArgs);
        } else if (element.type === 'shape') {
          args[arg] = buildShapePropType(element);
        } else {
          args[arg] = PropTypes[element.type](
            element.args.type && PropTypes[element.args.type] ?
              PropTypes[element.args.type] : element.args
          );
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

export default function docPropType(description, validate, options = {}) {
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
        const args = validate.args.map((arg) => {
          if (arg.type && PropTypes[arg.type]) {
            if (arg.args) {
              return PropTypes[arg.type](arg.args);
            }
            return PropTypes[arg.type];
          }
          return arg;
        });
        type = PropTypes[validate.type](args);
      } else if (validate.type === 'shape') {
        type = buildShapePropType(validate);
      } else {
        type = PropTypes[validate.type](
          validate.args.type && PropTypes[validate.args.type] ?
            PropTypes[validate.args.type] : validate.args
        );
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
