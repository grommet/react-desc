
const arrayFormat = array =>
  array.map(propType => propTypeFormat(propType));

const shapeFormat = (shape) => {
  const props = Object.keys(shape).map((key) => {
    const value = shape[key];
    let valueFormat;
    if (value.type &&
      ((value.type === 'arrayOf' || value.type === 'oneOfType' ||
        value.type === 'oneOf') && Array.isArray(value.args))) {
      valueFormat = `${propTypeFormat(value)}`;
    } else if (value.type === 'shape') {
      valueFormat = `${propTypeFormat(value)}`;
    } else {
      valueFormat = propTypeFormat(value);
    }
    return `${key}${value.reactDesc && value.reactDesc.required ? '' : '?'}: ${valueFormat}`;
  });
  return `{${props.join(',')}}`;
};

const propTypeFormat = (propType) => {
  let result;
  if (typeof propType !== 'function' && propType.type) {
    switch (propType.type) {
      case 'array':
        result = 'any[]';
        break;
      case 'arrayOf':
        if (Array.isArray(propType.args)) {
          result = `${arrayFormat(propType.args).join('\n')}[]`;
        } else if (propType.args.type === 'oneOfType') {
          result = `${propTypeFormat(propType.args)}[]`;
        } else {
          result = `${propTypeFormat(propType.args)}[]`;
        }
        break;
      case 'bool':
        result = 'boolean';
        break;
      case 'func':
        result = '((...args: any[]) => any)';
        break;
      case 'node':
        result = 'React.ReactNode';
        break;
      case 'element':
        result = 'JSX.Element';
        break;
      case 'instanceOf':
        result = 'any';
        break;
      case 'symbol':
        result = 'any';
        break;
      case 'objectOf':
        result = `{ [key: string]: ${propType.args.type} }`;
        break;
      case 'oneOf':
        result = propType.args.map(a => `"${a}"`).join(' | ');
        break;
      case 'oneOfType':
        if (Array.isArray(propType.args)) {
          result = arrayFormat(propType.args).join(' | ');
        } else {
          result = `${propTypeFormat(propType.args)}`;
        }
        break;
      case 'shape':
        result = `${shapeFormat(propType.args)}`;
        break;
      default:
        result = `${propType.type}`;
        break;
    }
  } else {
    result = 'any';
  }
  return result;
};

const propTypeAsTypescript = (propType, propName) => {
  const documentation = {
    ...propType.reactDesc,
    name: propName,
  };

  documentation.format = propTypeFormat(propType);

  return documentation;
};

export default function descToTypescript(component, reactDesc = {}) {
  if (!component) {
    throw new Error('react-desc: component is required');
  }

  const documentation = {
    name: component.displayName || component.name,
    ...reactDesc,
  };
  if (reactDesc) {
    delete documentation.propTypes;

    if (reactDesc.propTypes) {
      const propTypes = [];
      Object.keys(reactDesc.propTypes).forEach((propName) => {
        const propType = reactDesc.propTypes[propName];
        propTypes.push(
          propTypeAsTypescript(
            propType, propName,
          ),
        );
      });
      if (propTypes.length > 0) {
        documentation.properties = propTypes;
      }
    }
  }
  return documentation;
}
