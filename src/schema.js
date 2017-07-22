import docPropType from './docPropType';

export default function schema(component, metadata = {}) {
  if (!component) {
    throw new Error('schema: component is required');
  }
  if (!metadata.description) {
    throw new Error('schema: description is required');
  }

  const reactDesc = { ...metadata };
  delete reactDesc.props;
  let defaultProps;
  let propTypes;

  if (metadata.props) {
    Object.keys(metadata.props).forEach((propName) => {
      const prop = metadata.props[propName];
      // if it is an array it means that it is a react schema instance
      if (Array.isArray(prop)) {
        const validate = prop[0];
        const description = prop[1];
        const options = prop[2];

        if (options && options.defaultProp) {
          if (!defaultProps) {
            defaultProps = {};
          }
          defaultProps[propName] = options.defaultProp;
          delete options.defaultProp;
        }

        if (!propTypes) {
          propTypes = {};
        }
        propTypes[propName] = docPropType(validate, description, options);
      } else {
        propTypes[propName] = prop;
      }
    });
  }

  /* eslint-disable no-param-reassign */
  if (process.env.NODE_ENV !== 'production') {
    // only add documentation if it is not production
    component.$$reactDesc = reactDesc;
    if (propTypes) {
      component.propTypes = propTypes;
    }
  }

  // but always add default props :)
  if (!component.defaultProps && defaultProps) {
    component.defaultProps = defaultProps;
  }
  /* eslint-enable no-param-reassign */
}
