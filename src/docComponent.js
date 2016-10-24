export default function docComponent(description, component, options = {}) {
  if (!component) {
    throw new Error('docComponent: component is required');
  }
  if (!description) {
    throw new Error('docComponent: description is required');
  }

  /* eslint-disable no-param-reassign */
  component.$$reactDesc = { description, options };
  /* eslint-enable no-param-reassign */
}
