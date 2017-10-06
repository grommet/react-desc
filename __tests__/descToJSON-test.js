import React from 'react';
import ReactPropTypes from 'prop-types';
import descToJSON from '../src/descToJSON';
import decorate from '../src/decorate';
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

const DocumentedComponent = () => <div>fake</div>;

const DeprecatedComponent = ({ testDeprecated }) => <div>{testDeprecated}</div>;
DeprecatedComponent.propTypes = {
  testDeprecated: ReactPropTypes.string.isRequired,
};
const NoPropTypeComponent = () => <div>fake</div>;

class ExtraInfoComponent {
  render() {
    return (
      <div>fake</div>
    );
  }
}

decorate(DocumentedComponent, {
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
decorate(NoPropTypeComponent, {
  description: 'noPropType',
});
decorate(DeprecatedComponent, {
  description: 'component',
  deprecated: 'use button instead',
});
decorate(ExtraInfoComponent, {
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
    descToJSON(undefined);
  }).toThrowError('react-desc: component is required');
});

it('documents empty doc for component without reactDesc', () => {
  const documentation = descToJSON(FakeComponent);
  expect(documentation).toMatchSnapshot();
});

it('documents empty propType doc for component', () => {
  const documentation = descToJSON(NoPropTypeComponent);
  expect(documentation).toMatchSnapshot();
});

it('documents a basic documented component', () => {
  const documentation = descToJSON(DocumentedComponent);
  expect(documentation).toMatchSnapshot();
});

it('documents a deprecated documented component', () => {
  const documentation = descToJSON(DeprecatedComponent);
  expect(documentation).toMatchSnapshot();
});

it('documents an extra info documented component', () => {
  const documentation = descToJSON(ExtraInfoComponent);
  expect(documentation).toMatchSnapshot();
});
