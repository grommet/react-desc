import PropTypes from 'prop-types';

const convertArray = array =>
  array.map(type => convertPropType(type));

const convertShape = (shape) => {
  const result = {};
  Object.keys(shape).forEach((key) => {
    result[key] = convertPropType(shape[key]);
  });
  return result;
};

const convertPropType = (propType) => {
  let result;
  if (propType && propType.type) {
    if (!PropTypes[propType.type]) {
      throw new Error(`react-desc: unknown type ${propType.type}`);
    }
    if (propType.args) {
      if (propType.type === 'oneOfType' || propType.type === 'arrayOf') {
        if (Array.isArray(propType.args)) {
          result = PropTypes[propType.type](convertArray(propType.args));
        } else {
          result = PropTypes[propType.type](convertPropType(propType.args));
        }
      } else if (propType.type === 'shape') {
        result = PropTypes[propType.type](convertShape(propType.args));
      } else {
        result = PropTypes[propType.type](propType.args);
      }
    } else {
      result = PropTypes[propType.type];
    }
  } else {
    result = propType;
  }
  return result;
};

const decoratePropType = (propType, description, options = {}) => {
  if (!description) {
    throw new Error('react-desc: description is required');
  }
  if (!propType) {
    throw new Error('react-desc: propType is required');
  }

  let result = convertPropType(propType);
  if (propType.required === true || options.required) {
    result = result.isRequired;
  }
  result = result.bind(null);
  result.$$reactDesc = { description, propType, options };
  return result;
};

export default function decorate(component, metadata = {}) {
  if (!component) {
    throw new Error('react-desc: component is required');
  }
  if (!metadata.description) {
    throw new Error('react-desc: description is required');
  }

  const reactDesc = { ...metadata };
  delete reactDesc.props;
  const defaultProps = {};
  const propTypes = {};

  if (metadata.props) {
    Object.keys(metadata.props).forEach((name) => {
      const prop = metadata.props[name];
      // if it is an array it means that it has a description
      if (Array.isArray(prop)) {
        const [propType, description, options] = prop;

        if (options && options.defaultProp) {
          defaultProps[name] = options.defaultProp;
          delete options.defaultProp;
        }

        propTypes[name] = decoratePropType(propType, description, options);
      } else {
        propTypes[name] = prop;
      }
    });
  }

  /* eslint-disable no-param-reassign */
  component.$$reactDesc = reactDesc;
  if (!component.propTypes) {
    component.propTypes = propTypes;
  }

  if (!component.defaultProps) {
    component.defaultProps = defaultProps;
  }
  /* eslint-enable no-param-reassign */
}
