import PropTypes from 'prop-types';
import descToJSON from './descToJSON';
import descToMarkdown from './descToMarkdown';

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

export default function describe(component) {
  if (!component) {
    throw new Error('react-desc: component is required');
  }
  const handler = {
    set: (target, prop, value) => {
      /* eslint-disable no-param-reassign */
      if (prop === 'propTypes') {
        Object.keys(value).forEach((name) => {
          let propType = value[name];
          if (propType.type) {
            target.propTypes[name] = propType;
            propType = convertPropType(propType);
            if (value[name].required) {
              propType = propType.isRequired;
            }
          }

          if (!component.propTypes) {
            component.propTypes = {};
          }
          component.propTypes[name] = propType;
        });
      } else {
        target[prop] = value;
      }
      /* eslint-enable no-param-reassign */
      return true;
    },
    get: (target, prop) => {
      if (prop === 'toJSON') {
        return descToJSON.bind(null, component, target);
      } else if (prop === 'toMarkdown') {
        return descToMarkdown.bind(null, component, target);
      } else if (prop === 'description' || prop === 'deprecated') {
        /* eslint-disable no-param-reassign */
        return (value) => {
          const newTarget = { ...target };
          newTarget[prop] = value;
          return new Proxy(newTarget, handler);
        };
        /* eslint-enable no-param-reassign */
      }
      return component;
    },
  };
  return new Proxy({ propTypes: {} }, handler);
}
