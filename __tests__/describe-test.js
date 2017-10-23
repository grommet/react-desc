import React from 'react';
import ReactPropTypes from 'prop-types';
import describe from '../src/describe';
import PropTypes from '../src/PropTypes';

class FakeComponent {}

const complexShape = {
  color: PropTypes.string,
  fontSize: PropTypes.number,
  one: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(FakeComponent),
    (props, propName) => typeof props[propName] === 'number',
  ]),
  test: PropTypes.instanceOf(FakeComponent),
  test2: PropTypes.shape({
    test3: PropTypes.string.isRequired,
    test4: PropTypes.shape({
      test5: PropTypes.string,
      test6: PropTypes.number,
      test7: (props, propName) => typeof props[propName] === 'number',
      test8: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  test9: PropTypes.oneOfType([
    PropTypes.oneOf(['type1', 'type2']),
    PropTypes.shape({
      type: PropTypes.oneOf(['type1', 'type2']),
      count: PropTypes.number,
    }),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.oneOf(['type1', 'type2']),
        PropTypes.shape({
          type: PropTypes.oneOf(['type1', 'type2']),
          count: PropTypes.number,
        }),
      ]),
    ),
  ]),
};

const Component = () => <div>fake</div>;
const DocumentedComponent = describe(Component)
  .availableAt([
    {
      badge: 'https://codesandbox.io/static/img/play-codesandbox.svg',
      url: 'https://codesandbox.io/s/github/grommet/grommet-site?initialpath=button&amp;module=%2Fscreens%2FButton.js',
    },
    {
      badge: 'https://codesandbox.io/static/img/play-codesandbox.svg',
      url: 'https://codesandbox.io/s/github/grommet/grommet-site?initialpath=buttonNew&amp;module=%2Fscreens%2FButtonNew.js',
    },
  ])
  .description('component')
  .usage('test');
DocumentedComponent.propTypes = {
  test: PropTypes.any.description('any'),
  test2: PropTypes.array.description('array'),
  test3: PropTypes.arrayOf(PropTypes.number).description('arrayOf'),
  test4: PropTypes.bool.description('bool'),
  test5: PropTypes.custom(() => {}).description('custom').format('XXX-XX-XXXX'),
  test6: PropTypes.element.description('element'),
  test7: PropTypes.func.description('func'),
  test8: PropTypes.instanceOf(FakeComponent).description('instanceOf'),
  test9: PropTypes.node.description('node'),
  test10: PropTypes.number.description('number'),
  test11: PropTypes.object.description('object'),
  test12: PropTypes.objectOf(PropTypes.number).description('objectOf'),
  test13: PropTypes.oneOf(['News', 'Photos']).description('oneOf'),
  test14: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string,
  ]).description('oneOfType'),
  test15: PropTypes.symbol.description('symbol'),
  test16: PropTypes.shape(complexShape).description('shape'),
  testRequired: PropTypes.string.description('testRequired').isRequired,
  testDeprecated: (
    PropTypes.string.description('testRequired').defaultValue('abc').deprecated(
      'use something else',
    )
  ),
  testNative: ReactPropTypes.string,
};

it('fails for missing component', () => {
  expect(() => {
    describe(undefined);
  }).toThrowError('react-desc: component is required');
});

it('returns a documented json', () => {
  expect(DocumentedComponent.toJSON()).toMatchSnapshot();
});

it('returns a deprecated documented json', () => {
  expect(DocumentedComponent.deprecated('yes it is deprecated').toJSON()).toMatchSnapshot();
});

it('returns a documented markdown', () => {
  expect(DocumentedComponent.toMarkdown()).toMatchSnapshot();
});

it('returns a deprecated documented markdown', () => {
  expect(DocumentedComponent.deprecated('yes it is deprecated').toMarkdown()).toMatchSnapshot();
});
