import React from 'react';
import getDocAsMarkdown from '../src/getDocAsMarkdown';
import docComponent from '../src/docComponent';
import docPropType from '../src/docPropType';
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
DocumentedComponent.propTypes = {
  test: docPropType('any', PropTypes.any),
  test2: docPropType('array', PropTypes.array),
  test3: docPropType(
    'arrayOf', PropTypes.arrayOf(PropTypes.number)
  ),
  test4: docPropType('bool', PropTypes.bool),
  test5: docPropType('custom', () => {}, {
    format: 'XXX-XX-XXXX',
  }),
  test6: docPropType('element', PropTypes.element),
  test7: docPropType('func', PropTypes.func),
  test8: docPropType('instanceOf', PropTypes.instanceOf(FakeComponent)),
  test9: docPropType('node', PropTypes.node),
  test10: docPropType('number', PropTypes.number),
  test11: docPropType('object', PropTypes.object),
  test12: docPropType('objectOf', PropTypes.objectOf(PropTypes.number)),
  test13: docPropType('oneOf', PropTypes.oneOf(['News', 'Photos'])),
  test14: docPropType('oneOfType', PropTypes.oneOfType([
    PropTypes.number, PropTypes.string,
  ])),
  test15: docPropType('symbol', PropTypes.symbol),
  test16: docPropType('shape', PropTypes.shape(complexShape)),
  testRequired: docPropType('testRequired', PropTypes.string, {
    required: true,
  }),
  testDeprecated: docPropType('testDeprecated', PropTypes.string, {
    deprecated: 'use something else',
  }),
  testExtra: docPropType('testExtra', PropTypes.string, {
    usage: 'test5 = "abc"',
  }),
};
DocumentedComponent.defaultProps = {
  testExtra: 'abc',
};
const DeprecatedComponent = () => <div>deprecated</div>;
DeprecatedComponent.propTypes = {
  testDeprecated: React.PropTypes.string,
};
const NoPropTypeComponent = () => <div>fake</div>;
/* eslint-disable react/prefer-es6-class */
const ExtraInfoComponent = React.createClass({
  propTypes: {
    test: docPropType('test', PropTypes.string),
  },

  getDefaultProps() {
    return {
      test: 'abc',
    };
  },

  render() {
    return (
      <div>fake</div>
    );
  },
});
/* eslint-enable react/prefer-es6-class */

docComponent('component', DocumentedComponent);
docComponent('noPropType', NoPropTypeComponent);
docComponent('component', DeprecatedComponent, {
  deprecated: 'use button instead',
});
docComponent('component', ExtraInfoComponent, {
  usage: 'import component  from "grommet/components/Anchor"',
});

it('fails for missing component property', () => {
  expect(() => {
    getDocAsMarkdown(undefined);
  }).toThrowError('getDocAsMarkdown: component is required');
});

it('documents empty doc for component without reactDesc', () => {
  const documentation = getDocAsMarkdown(FakeComponent);
  expect(documentation).toMatchSnapshot();
});

it('documents empty propType doc for component', () => {
  const documentation = getDocAsMarkdown(NoPropTypeComponent);
  expect(documentation).toMatchSnapshot();
});

it('documents a basic documented component', () => {
  const documentation = getDocAsMarkdown(DocumentedComponent);
  expect(documentation).toMatchSnapshot();
});

it('documents a deprecated documented component', () => {
  const documentation = getDocAsMarkdown(DeprecatedComponent);
  expect(documentation).toMatchSnapshot();
});

it('documents an extra info documented component', () => {
  const documentation = getDocAsMarkdown(ExtraInfoComponent);
  expect(documentation).toMatchSnapshot();
});
