import React from 'react';

import describe from '../src/describe';
import PropTypes from '../src/PropTypes';

class FakeComponent {}

const props = {
  color: PropTypes.string.description('color (string)'),
  fontSize: PropTypes.number.description('fontSize (number)'),
  one: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(FakeComponent)
  ]).description('one (oneOfType)'),
  deprecatedProp: PropTypes.string
    .description('deprecated (string)')
    .deprecated('do not use')
};

const Component = () => <div>base</div>;
const DocumentedComponent = describe(Component).description('the component');
DocumentedComponent.propTypes = props;

it('returns JSON with all props', () => {
  expect(DocumentedComponent.documentation.toJSON()).toMatchSnapshot();
  expect(DocumentedComponent.documentation.toJSON()).toEqual(
    DocumentedComponent.toJSON()
  );
});

it('returns Markdown with all props', () => {
  expect(DocumentedComponent.documentation.toMarkdown()).toMatchSnapshot();
  expect(DocumentedComponent.documentation.toMarkdown()).toEqual(
    DocumentedComponent.toMarkdown()
  );
});

it('returns Typescript with all props', () => {
  expect(DocumentedComponent.documentation.toTypescript()).toMatchSnapshot();
  expect(DocumentedComponent.documentation.toTypescript()).toEqual(
    DocumentedComponent.toTypescript()
  );
});
