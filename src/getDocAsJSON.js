function buildShapeFormat(validate) {
  const format = {};
  Object.keys(validate.args).forEach((arg) => {
    const element = validate.args[arg];
    if (element.type === 'shape') {
      format[arg] = buildShapeFormat(element, true);
    } else {
      format[arg] = getFormat(element);
    }
  });
  return format;
}

function getFormat(validate) {
  switch (validate.type) {
    case 'arrayOf':
      return `[${validate.args.type}, ...]`;
    case 'bool':
      return 'boolean';
    case 'func':
      return 'function';
    case 'instanceOf':
      return `new ${validate.args.name}(...)`;
    case 'objectOf':
      return `{ test: ${validate.args.type}, ... }`;
    case 'oneOf':
      return validate.args;
    case 'oneOfType':
      return validate.args.map(
        arg => getFormat(arg)
      );
    case 'shape':
      return JSON.stringify(buildShapeFormat(validate));
    default:
      return validate.type ? validate.type : 'custom';
  }
}

function getPropTypeAsJson(propType, propName, defaultValue) {
  const {
    deprecated, format, required, ...extras
  } = propType.$$reactDesc.options;
  const { validate } = propType.$$reactDesc;
  const documentation = {
    description: propType.$$reactDesc.description,
    name: propName,
  };

  if (defaultValue) {
    documentation.defaultValue = defaultValue;
  }

  if (deprecated) {
    documentation.deprecated = deprecated;
  }

  if (required) {
    documentation.required = required;
  }

  if (Object.keys(extras).length > 0) {
    documentation.extras = extras;
  }

  documentation.format = format || getFormat(validate);

  return documentation;
}

export default function getDocAsJSON(component) {
  if (!component) {
    throw new Error('getDocAsJSON: component is required');
  }

  const documentation = {
    name: component.displayName || component.name,
  };
  if (component.$$reactDesc) {
    Object.assign(documentation, component.$$reactDesc);

    if (component.propTypes) {
      const propTypes = [];
      Object.keys(component.propTypes).forEach((propName) => {
        const propType = component.propTypes[propName];
        if (propType.$$reactDesc) {
          propTypes.push(
            getPropTypeAsJson(
              propType, propName, component.defaultProps[propName]
            )
          );
        }
      });
      if (propTypes.length > 0) {
        documentation.properties = propTypes;
      }
    }
  }
  return documentation;
}
