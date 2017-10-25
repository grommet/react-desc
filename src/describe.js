import React from 'react';
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

export default function describe(Component) {
  if (!Component) {
    throw new Error('react-desc: component is required');
  }

  const documentation = {
    propTypes: {},
  };

  const DocumentedComponent = props => <Component {...props} />;
  DocumentedComponent.WrappedComponent = Component;
  DocumentedComponent.displayName = Component.displayName || Component.name;

  const addDocumentationProp = propName => (value) => {
    documentation[propName] = value;
    return DocumentedComponent;
  };

  DocumentedComponent.availableAt = addDocumentationProp('availableAt');
  DocumentedComponent.description = addDocumentationProp('description');
  DocumentedComponent.deprecated = addDocumentationProp('deprecated');
  DocumentedComponent.usage = addDocumentationProp('usage');

  DocumentedComponent.toJSON = descToJSON.bind(null, Component, documentation);
  DocumentedComponent.toMarkdown = descToMarkdown.bind(null, Component, documentation);

  Object.defineProperty(
    DocumentedComponent,
    'propTypes', {
      set: value => Object.keys(value).map((name) => {
        let propType = value[name];
        if (propType.type) {
          documentation.propTypes[name] = propType;
          propType = convertPropType(propType);
          if (value[name].reactDesc.required) {
            propType = propType.isRequired;
          }
        }

        return propType;
      }),
      enumerable: true,
      configurable: true,
    },
  );

  return DocumentedComponent;
}
