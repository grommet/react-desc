import React from 'react';
import ReactPropTypes from 'prop-types';
import getDocAsJSON from '../src/getDocAsJSON';
import schema from '../src/schema';
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
    test3: PropTypes.string,
    test4: PropTypes.shape({
      test5: PropTypes.string,
      test6: PropTypes.number,
      test7: (props, propName) => typeof props[propName] === 'number',
      test8: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

const DocumentedComponent = () => <div>fake</div>;

const DeprecatedComponent = () => <div>deprecated</div>;
DeprecatedComponent.propTypes = {
  testDeprecated: ReactPropTypes.string,
};
const NoPropTypeComponent = () => <div>fake</div>;
/* eslint-disable react/prefer-es6-class, react/prefer-stateless-function */
const ExtraInfoComponent = React.createClass({
  render() {
    return (
      <div>fake</div>
    );
  },
});
/* eslint-enable react/prefer-es6-class, react/prefer-stateless-function */

schema(DocumentedComponent, {
  description: 'component',
  props: {
    test: [PropTypes.any, 'any'],
    test2: [PropTypes.array, 'array'],
    test3: [
      PropTypes.arrayOf(PropTypes.number), 'arrayOf',
    ],
    test4: [PropTypes.bool, 'bool'],
    test5: [() => {}, 'custom', {
      format: 'XXX-XX-XXXX',
    }],
    test6: [PropTypes.element, 'element'],
    test7: [PropTypes.func, 'func'],
    test8: [PropTypes.instanceOf(FakeComponent), 'instanceOf'],
    test9: [PropTypes.node, 'node'],
    test10: [PropTypes.number, 'number'],
    test11: [PropTypes.object, 'object'],
    test12: [PropTypes.objectOf(PropTypes.number), 'objectOf'],
    test13: [PropTypes.oneOf(['News', 'Photos']), 'oneOf'],
    test14: [PropTypes.oneOfType([
      PropTypes.number, PropTypes.string,
    ]), 'oneOfType'],
    test15: [PropTypes.symbol, 'symbol'],
    test16: [PropTypes.shape(complexShape), 'shape'],
    testRequired: [PropTypes.string, 'testRequired', {
      required: true,
    }],
    testDeprecated: [PropTypes.string, 'testDeprecated', {
      defaultProp: 'abc',
      deprecated: 'use something else',
    }],
    testExtra: [PropTypes.string, 'testExtra', {
      defaultProp: 'abc',
      usage: 'test5 = "abc"',
    }],
    testNative: ReactPropTypes.string,
  },
});
schema(NoPropTypeComponent, {
  description: 'noPropType',
});
schema(DeprecatedComponent, {
  description: 'component',
  deprecated: 'use button instead',
});
schema(ExtraInfoComponent, {
  description: 'component',
  props: {
    test: [PropTypes.string, 'test', {
      defaultProp: 'abc',
    }],
  },
  usage: 'import component  from "grommet/components/Anchor"',
});

it('fails for missing component property', () => {
  expect(() => {
    getDocAsJSON(undefined);
  }).toThrowError('getDocAsJSON: component is required');
});

it('documents empty doc for component without reactDesc', () => {
  const documentation = getDocAsJSON(FakeComponent);
  expect(documentation).toMatchSnapshot();
});

it('documents empty propType doc for component', () => {
  const documentation = getDocAsJSON(NoPropTypeComponent);
  expect(documentation).toMatchSnapshot();
});

it('documents a basic documented component', () => {
  const documentation = getDocAsJSON(DocumentedComponent);
  expect(documentation).toMatchSnapshot();
});

it('documents a deprecated documented component', () => {
  const documentation = getDocAsJSON(DeprecatedComponent);
  expect(documentation).toMatchSnapshot();
});

it('documents an extra info documented component', () => {
  const documentation = getDocAsJSON(ExtraInfoComponent);
  expect(documentation).toMatchSnapshot();
});
