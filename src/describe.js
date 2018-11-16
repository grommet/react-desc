import React, { Component } from 'react';
import PropTypes from 'prop-types';
import descToJSON from './descToJSON';
import descToMarkdown from './descToMarkdown';
import descToTypescript from './descToTypescript';

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

export default function describe(ComponentInstance) {
  if (!ComponentInstance) {
    throw new Error('react-desc: component is required');
  }

  const documentation = {
    propTypes: {},
  };

  const DocumentedComponent = ComponentInstance;

  const addDocumentationProp = propName => (value) => {
    documentation[propName] = value;
    return DocumentedComponent;
  };

  DocumentedComponent.availableAt = addDocumentationProp('availableAt');
  DocumentedComponent.description = addDocumentationProp('description');
  DocumentedComponent.details = addDocumentationProp('details');
  DocumentedComponent.deprecated = addDocumentationProp('deprecated');
  DocumentedComponent.usage = addDocumentationProp('usage');

  DocumentedComponent.toJSON = descToJSON.bind(null, ComponentInstance, documentation);
  DocumentedComponent.toTypescript = descToTypescript.bind(null, ComponentInstance, documentation);
  DocumentedComponent.toMarkdown = descToMarkdown.bind(null, ComponentInstance, documentation);

  Object.defineProperty(
    DocumentedComponent,
    'propTypes', {
      get: () => DocumentedComponent.propTypesValue,
      set: (value) => {
        if (!DocumentedComponent.propTypesValue) {
          DocumentedComponent.propTypesValue = {};
        }
        Object.keys(value).forEach((name) => {
          let propType = value[name];
          if (propType.type) {
            documentation.propTypes[name] = propType;
            propType = convertPropType(propType);
            if (value[name].reactDesc.required) {
              propType = propType.isRequired;
            }
          }
          DocumentedComponent.propTypesValue[name] = propType;
          return propType;
        });
      },
      enumerable: true,
      configurable: true,
    },
  );

  return DocumentedComponent;
}
