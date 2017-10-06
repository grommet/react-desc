
const arrayFormat = (array, prefix) =>
  array.map(propType => propTypeFormat(propType, prefix));

const shapeFormat = (shape, prefix) => {
  const props = Object.keys(shape).map((key) => {
    const value = shape[key];
    let valueFormat;
    if (value.type &&
      ((value.type === 'arrayOf' || value.type === 'oneOfType' ||
        value.type === 'oneOf') && Array.isArray(value.args))) {
      valueFormat = `\n${propTypeFormat(value, `${prefix}    `)}`;
    } else if (value.type === 'shape') {
      valueFormat = `\n${propTypeFormat(value, `${prefix}    `)}`;
    } else {
      valueFormat = propTypeFormat(value);
    }
    return `${prefix}  ${key}: ${valueFormat}`;
  });
  return `${prefix}{\n${props.join(',\n')}\n${prefix}}`;
};

const propTypeFormat = (propType, prefix = '') => {
  let result;
  if (propType.type) {
    switch (propType.type) {
      case 'arrayOf':
        if (Array.isArray(propType.args)) {
          result = `${prefix}[\n${arrayFormat(propType.args, `${prefix}  `).join('\n')}\n${prefix}]`;
        } else if (propType.args.type === 'oneOfType') {
          result = `${prefix}[\n${propTypeFormat(propType.args, `${prefix}  `)}\n${prefix}]`;
        } else {
          result = `${prefix}[${propTypeFormat(propType.args)}]`;
        }
        break;
      case 'bool':
        result = `${prefix}boolean`;
        break;
      case 'func':
        result = `${prefix}function`;
        break;
      case 'instanceOf':
        result = `${prefix}new ${propType.args.name}(...)`;
        break;
      case 'objectOf':
        result = `${prefix}{ test: ${propType.args.type}, ... }`;
        break;
      case 'oneOf':
        result = propType.args.map(a => `${prefix}${a}`).join('\n');
        break;
      case 'oneOfType':
        if (Array.isArray(propType.args)) {
          result = arrayFormat(propType.args, prefix).join('\n');
        } else {
          result = `${prefix}${propTypeFormat(propType.args)}`;
        }
        break;
      case 'shape':
        result = `${shapeFormat(propType.args, prefix)}`;
        break;
      default:
        result = `${prefix}${propType.type}`;
        break;
    }
  } else {
    result = `${prefix}custom`;
  }
  return result;
};

const propTypeAsJson = (reactDesc, propName, defaultValue) => {
  const {
    deprecated, format, required, ...extras
  } = reactDesc.options;
  const { propType } = reactDesc;
  const documentation = {
    description: reactDesc.description,
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

  documentation.format = format || propTypeFormat(propType);

  return documentation;
};

export default function descToJSON(component) {
  if (!component) {
    throw new Error('react-desc: component is required');
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
            propTypeAsJson(
              propType.$$reactDesc, propName, (component.defaultProps || {})[propName],
            ),
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
