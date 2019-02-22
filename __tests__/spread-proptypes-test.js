import React from 'react';

import describe from '../src/describe';
import PropTypes from '../src/PropTypes';

class FakeComponent {}

const baseProps = {
  color: PropTypes.string.description('color (string)'),
  fontSize: PropTypes.number.description('fontSize (number)'),
  one: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(FakeComponent),
  ]).description('one (oneOfType)'),
  deprecatedProp: PropTypes.string
    .description('deprecated (string)')
    .deprecated('do not use'),
};

const additionalProps = {
  arr: PropTypes.arrayOf(PropTypes.number).description('arr (array of number)'),
  fun: PropTypes.func
    .description('fun (function)')
    .deprecated('a deprecated function'),
};

const BaseComponent = () => <div>base</div>;
const DocumentedBaseComponent = describe(BaseComponent).description(
  'the base component',
);
DocumentedBaseComponent.propTypes = baseProps;

const ExtendedComponent = () => <div>extended</div>;
const DocumentedExtendedComponent = describe(ExtendedComponent).description(
  'this component spreads the base component prop types',
);
DocumentedExtendedComponent.propTypes = {
  ...BaseComponent.describedPropTypes,
  ...additionalProps,
};

it('returns JSON with all props', () => {
  expect(DocumentedExtendedComponent.toJSON()).toMatchSnapshot();
});

it('returns Markdown with all props', () => {
  expect(DocumentedExtendedComponent.toMarkdown()).toMatchSnapshot();
});

it('returns Typescript with all props', () => {
  expect(DocumentedExtendedComponent.toTypescript()).toMatchSnapshot();
});
