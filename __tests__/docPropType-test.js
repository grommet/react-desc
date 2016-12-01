import React from 'react';

import docPropType from '../src/docPropType';
import PropTypes from '../src/PropTypes';

it('fails for missing description propType', () => {
  expect(() => {
    docPropType(PropTypes.any, undefined);
  }).toThrowError('docPropType: description is required');
});

it('fails for missing validate propType', () => {
  expect(() => {
    docPropType(undefined, 'test');
  }).toThrowError('docPropType: validate is required');
});

it('fails for missing type', () => {
  expect(() => {
    docPropType({ type: 'crazy' }, 'test');
  }).toThrowError('docPropType: unknown type crazy');
});

it('fails for missing type in shape', () => {
  expect(() => {
    docPropType(PropTypes.shape({ test: { type: 'crazy' } }), 'test');
  }).toThrowError('docPropType: unknown type crazy');
});

describe('any', () => {
  it('documents a basic any propType', () => {
    const anyPropType = docPropType(PropTypes.any, 'any');

    expect(anyPropType).toBeDefined();
    expect(anyPropType.isRequired).toBeTruthy();
    expect(anyPropType.$$reactDesc).toBeDefined();
    expect(anyPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required any propType', () => {
    const anyPropType = docPropType(PropTypes.any, 'any', {
      required: true,
    });

    expect(anyPropType).toBeDefined();
    expect(anyPropType.isRequired).toBeFalsy();
    expect(anyPropType.$$reactDesc).toBeDefined();
    expect(anyPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated any propType', () => {
    const anyPropType = docPropType(PropTypes.any, 'any', {
      deprecated: 'deprecated. use something else',
    });

    expect(anyPropType).toBeDefined();
    expect(anyPropType.isRequired).toBeTruthy();
    expect(anyPropType.$$reactDesc).toBeDefined();
    expect(anyPropType.$$reactDesc).toMatchSnapshot();
  });
});

describe('array', () => {
  const FakeComponent = props => <div>{props.test}</div>;
  FakeComponent.propTypes = {
    test: docPropType(PropTypes.array, 'array'),
  };
  const FakeComponentRequired = props => <div>{props.testArray}</div>;
  FakeComponentRequired.propTypes = {
    testArray: docPropType(PropTypes.array, 'array', {
      required: true,
    }),
  };
  it('documents a basic array propType', () => {
    const arrayPropType = docPropType(PropTypes.array, 'array');

    expect(arrayPropType).toBeDefined();
    expect(arrayPropType.isRequired).toBeTruthy();
    expect(arrayPropType.$$reactDesc).toBeDefined();
    expect(arrayPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required array propType', () => {
    const arrayPropType = docPropType(PropTypes.array, 'array', {
      required: true,
    });

    expect(arrayPropType).toBeDefined();
    expect(arrayPropType.isRequired).toBeFalsy();
    expect(arrayPropType.$$reactDesc).toBeDefined();
    expect(arrayPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated array propType', () => {
    const arrayPropType = docPropType(PropTypes.array, 'array', {
      deprecated: 'deprecated. use something else',
    });

    expect(arrayPropType).toBeDefined();
    expect(arrayPropType.isRequired).toBeTruthy();
    expect(arrayPropType.$$reactDesc).toBeDefined();
    expect(arrayPropType.$$reactDesc).toMatchSnapshot();
  });

  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an array docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={['valid']} />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with an array docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test="invalid" />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: Invalid prop `test` of type `string` supplied to `FakeComponent`, expected `array`.\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required array docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: The prop `testArray` is marked as required in `FakeComponentRequired`, but its value is `undefined`.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional array docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});

describe('bool', () => {
  const FakeComponent = props => <div>{props.test}</div>;
  FakeComponent.propTypes = {
    test: docPropType(PropTypes.bool, 'bool'),
  };
  const FakeComponentRequired = props => <div>{props.testBool}</div>;
  FakeComponentRequired.propTypes = {
    testBool: docPropType(PropTypes.bool, 'bool', {
      required: true,
    }),
  };
  it('documents a basic bool propType', () => {
    const boolPropType = docPropType(PropTypes.bool, 'bool');

    expect(boolPropType).toBeDefined();
    expect(boolPropType.isRequired).toBeTruthy();
    expect(boolPropType.$$reactDesc).toBeDefined();
    expect(boolPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required bool propType', () => {
    const boolPropType = docPropType(PropTypes.bool, 'bool', {
      required: true,
    });

    expect(boolPropType).toBeDefined();
    expect(boolPropType.isRequired).toBeFalsy();
    expect(boolPropType.$$reactDesc).toBeDefined();
    expect(boolPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated bool propType', () => {
    const boolPropType = docPropType(PropTypes.bool, 'bool', {
      deprecated: 'deprecated. use something else',
    });

    expect(boolPropType).toBeDefined();
    expect(boolPropType.isRequired).toBeTruthy();
    expect(boolPropType.$$reactDesc).toBeDefined();
    expect(boolPropType.$$reactDesc).toMatchSnapshot();
  });

  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an bool docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={false} />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with an bool docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test="invalid" />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: Invalid prop `test` of type `string` supplied to `FakeComponent`, expected `boolean`.\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required bool docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: The prop `testBool` is marked as required in `FakeComponentRequired`, but its value is `undefined`.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional bool docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});

describe('func', () => {
  const FakeComponent = props => <div onClick={props.test}>test</div>;
  FakeComponent.propTypes = {
    test: docPropType(PropTypes.func, 'func'),
  };
  const FakeComponentRequired = props => (
    <div onClick={props.testFunc}>test</div>
  );
  FakeComponentRequired.propTypes = {
    testFunc: React.PropTypes.bool.isRequired,
  };
  it('documents a basic func propType', () => {
    const funcPropType = docPropType(PropTypes.func, 'func');

    expect(funcPropType).toBeDefined();
    expect(funcPropType.isRequired).toBeTruthy();
    expect(funcPropType.$$reactDesc).toBeDefined();
    expect(funcPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required func propType', () => {
    const funcPropType = docPropType(PropTypes.func, 'func', {
      required: true,
    });

    expect(funcPropType).toBeDefined();
    expect(funcPropType.isRequired).toBeFalsy();
    expect(funcPropType.$$reactDesc).toBeDefined();
    expect(funcPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated func propType', () => {
    const funcPropType = docPropType(PropTypes.func, 'func', {
      deprecated: 'deprecated. use something else',
    });

    expect(funcPropType).toBeDefined();
    expect(funcPropType.isRequired).toBeTruthy();
    expect(funcPropType.$$reactDesc).toBeDefined();
    expect(funcPropType.$$reactDesc).toMatchSnapshot();
  });
  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an func docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={() => {}} />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with an func docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test="invalid" />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: Invalid prop `test` of type `string` supplied to `FakeComponent`, expected `function`.\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required func docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: The prop `testFunc` is marked as required in `FakeComponentRequired`, but its value is `undefined`.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional func docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});

describe('number', () => {
  const FakeComponent = props => <div>{props.test}</div>;
  FakeComponent.propTypes = {
    test: docPropType(PropTypes.number, 'number'),
  };
  const FakeComponentRequired = props => <div>{props.testNumber}</div>;
  FakeComponentRequired.propTypes = {
    testNumber: docPropType(PropTypes.number, 'number', {
      required: true,
    }),
  };
  it('documents a basic number propType', () => {
    const numberPropType = docPropType(PropTypes.number, 'number');

    expect(numberPropType).toBeDefined();
    expect(numberPropType.isRequired).toBeTruthy();
    expect(numberPropType.$$reactDesc).toBeDefined();
    expect(numberPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required number propType', () => {
    const numberPropType = docPropType(PropTypes.number, 'number', {
      required: true,
    });

    expect(numberPropType).toBeDefined();
    expect(numberPropType.isRequired).toBeFalsy();
    expect(numberPropType.$$reactDesc).toBeDefined();
    expect(numberPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated number propType', () => {
    const numberPropType = docPropType(PropTypes.number, 'number', {
      deprecated: 'deprecated. use something else',
    });

    expect(numberPropType).toBeDefined();
    expect(numberPropType.isRequired).toBeTruthy();
    expect(numberPropType.$$reactDesc).toBeDefined();
    expect(numberPropType.$$reactDesc).toMatchSnapshot();
  });

  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an number docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={10} />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with an number docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test="invalid" />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: Invalid prop `test` of type `string` supplied to `FakeComponent`, expected `number`.\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required number docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: The prop `testNumber` is marked as required in `FakeComponentRequired`, but its value is `undefined`.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional number docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});

describe('object', () => {
  const FakeComponent = props => <div>{props.test}</div>;
  FakeComponent.propTypes = {
    test: docPropType(PropTypes.object, 'object'),
  };
  const FakeComponentRequired = props => <div>{props.testObject}</div>;
  FakeComponentRequired.propTypes = {
    testObject: docPropType(PropTypes.object, 'object', {
      required: true,
    }),
  };
  it('documents a basic object propType', () => {
    const objectPropType = docPropType(PropTypes.object, 'object');

    expect(objectPropType).toBeDefined();
    expect(objectPropType.isRequired).toBeTruthy();
    expect(objectPropType.$$reactDesc).toBeDefined();
    expect(objectPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required object propType', () => {
    const objectPropType = docPropType(PropTypes.object, 'object', {
      required: true,
    });

    expect(objectPropType).toBeDefined();
    expect(objectPropType.isRequired).toBeFalsy();
    expect(objectPropType.$$reactDesc).toBeDefined();
    expect(objectPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated object propType', () => {
    const objectPropType = docPropType(PropTypes.object, 'object', {
      deprecated: 'deprecated. use something else',
    });

    expect(objectPropType).toBeDefined();
    expect(objectPropType.isRequired).toBeTruthy();
    expect(objectPropType.$$reactDesc).toBeDefined();
    expect(objectPropType.$$reactDesc).toMatchSnapshot();
  });

  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an object docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={{ test: 'hi' }} />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with an object docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test="invalid" />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: Invalid prop `test` of type `string` supplied to `FakeComponent`, expected `object`.\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required object docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: The prop `testObject` is marked as required in `FakeComponentRequired`, but its value is `undefined`.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional object docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});

describe('string', () => {
  const FakeComponent = props => <div>{props.test}</div>;
  FakeComponent.propTypes = {
    test: docPropType(PropTypes.string, 'string'),
  };
  const FakeComponentRequired = props => <div>{props.testString}</div>;
  FakeComponentRequired.propTypes = {
    testString: docPropType(PropTypes.string, 'string', {
      required: true,
    }),
  };
  it('documents a basic string propType', () => {
    const stringPropType = docPropType(PropTypes.string, 'string');

    expect(stringPropType).toBeDefined();
    expect(stringPropType.isRequired).toBeTruthy();
    expect(stringPropType.$$reactDesc).toBeDefined();
    expect(stringPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required string propType', () => {
    const stringPropType = docPropType(PropTypes.string, 'string', {
      required: true,
    });

    expect(stringPropType).toBeDefined();
    expect(stringPropType.isRequired).toBeFalsy();
    expect(stringPropType.$$reactDesc).toBeDefined();
    expect(stringPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated string propType', () => {
    const stringPropType = docPropType(PropTypes.string, 'string', {
      deprecated: 'deprecated. use something else',
    });

    expect(stringPropType).toBeDefined();
    expect(stringPropType.isRequired).toBeTruthy();
    expect(stringPropType.$$reactDesc).toBeDefined();
    expect(stringPropType.$$reactDesc).toMatchSnapshot();
  });

  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an string docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test="valid" />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with an string docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={10} />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: Invalid prop `test` of type `number` supplied to `FakeComponent`, expected `string`.\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required string docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: The prop `testString` is marked as required in `FakeComponentRequired`, but its value is `undefined`.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional string docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});

describe('symbol', () => {
  const FakeComponent = props => <div>{props.test}</div>;
  FakeComponent.propTypes = {
    test: docPropType(PropTypes.symbol, 'symbol'),
  };
  const FakeComponentRequired = props => <div>{props.testSymbol}</div>;
  FakeComponentRequired.propTypes = {
    testSymbol: docPropType(PropTypes.symbol, 'symbol', {
      required: true,
    }),
  };
  it('documents a basic symbol propType', () => {
    const symbolPropType = docPropType(PropTypes.symbol, 'symbol');

    expect(symbolPropType).toBeDefined();
    expect(symbolPropType.isRequired).toBeTruthy();
    expect(symbolPropType.$$reactDesc).toBeDefined();
    expect(symbolPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required symbol propType', () => {
    const symbolPropType = docPropType(PropTypes.symbol, 'symbol', {
      required: true,
    });

    expect(symbolPropType).toBeDefined();
    expect(symbolPropType.isRequired).toBeFalsy();
    expect(symbolPropType.$$reactDesc).toBeDefined();
    expect(symbolPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated symbol propType', () => {
    const symbolPropType = docPropType(PropTypes.symbol, 'symbol', {
      deprecated: 'deprecated. use something else',
    });

    expect(symbolPropType).toBeDefined();
    expect(symbolPropType.isRequired).toBeTruthy();
    expect(symbolPropType.$$reactDesc).toBeDefined();
    expect(symbolPropType.$$reactDesc).toMatchSnapshot();
  });

  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an symbol docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={Symbol('valid')} />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with an symbol docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test="invalid" />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: Invalid prop `test` of type `string` supplied to `FakeComponent`, expected `symbol`.\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required symbol docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: The prop `testSymbol` is marked as required in `FakeComponentRequired`, but its value is `undefined`.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional symbol docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});

describe('node', () => {
  const FakeComponent = props => <div>{props.test}</div>;
  FakeComponent.propTypes = {
    test: docPropType(PropTypes.node, 'node'),
  };
  const FakeComponentRequired = props => <div>{props.testNode}</div>;
  FakeComponentRequired.propTypes = {
    testNode: docPropType(PropTypes.node, 'node', {
      required: true,
    }),
  };
  it('documents a basic node propType', () => {
    const nodePropType = docPropType(PropTypes.node, 'node');

    expect(nodePropType).toBeDefined();
    expect(nodePropType.isRequired).toBeTruthy();
    expect(nodePropType.$$reactDesc).toBeDefined();
    expect(nodePropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required node propType', () => {
    const nodePropType = docPropType(PropTypes.node, 'node', {
      required: true,
    });

    expect(nodePropType).toBeDefined();
    expect(nodePropType.isRequired).toBeFalsy();
    expect(nodePropType.$$reactDesc).toBeDefined();
    expect(nodePropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated node propType', () => {
    const nodePropType = docPropType(PropTypes.node, 'node', {
      deprecated: 'deprecated. use something else',
    });

    expect(nodePropType).toBeDefined();
    expect(nodePropType.isRequired).toBeTruthy();
    expect(nodePropType.$$reactDesc).toBeDefined();
    expect(nodePropType.$$reactDesc).toMatchSnapshot();
  });

  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an node docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test="valid" />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with a node docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={() => {}} />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: Invalid prop `test` supplied to `FakeComponent`, expected a ReactNode.\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required node docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: The prop `testNode` is marked as required in `FakeComponentRequired`, but its value is `undefined`.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional node docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});

describe('element', () => {
  const FakeComponent = props => <div>{props.test}</div>;
  FakeComponent.propTypes = {
    test: docPropType(PropTypes.element, 'element'),
  };
  const FakeComponentRequired = props => <div>{props.testElement}</div>;
  FakeComponentRequired.propTypes = {
    testElement: docPropType(PropTypes.element, 'element', {
      required: true,
    }),
  };
  it('documents a basic element propType', () => {
    const elementPropType = docPropType(PropTypes.element, 'element');

    expect(elementPropType).toBeDefined();
    expect(elementPropType.isRequired).toBeTruthy();
    expect(elementPropType.$$reactDesc).toBeDefined();
    expect(elementPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required element propType', () => {
    const elementPropType = docPropType(PropTypes.element, 'element', {
      required: true,
    });

    expect(elementPropType).toBeDefined();
    expect(elementPropType.isRequired).toBeFalsy();
    expect(elementPropType.$$reactDesc).toBeDefined();
    expect(elementPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated element propType', () => {
    const elementPropType = docPropType(PropTypes.element, 'element', {
      deprecated: 'deprecated. use something else',
    });

    expect(elementPropType).toBeDefined();
    expect(elementPropType.isRequired).toBeTruthy();
    expect(elementPropType.$$reactDesc).toBeDefined();
    expect(elementPropType.$$reactDesc).toMatchSnapshot();
  });

  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an element docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={<FakeComponent />} />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with a element docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test="invalid" />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: Invalid prop `test` of type `string` supplied to `FakeComponent`, expected a single ReactElement.\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required element docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: The prop `testElement` is marked as required in `FakeComponentRequired`, but its value is `undefined`.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional element docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});

describe('instanceOf', () => {
  class FakeClass {}
  const FakeComponent = props => <div>{props.test}</div>;
  FakeComponent.propTypes = {
    test: docPropType(PropTypes.instanceOf(FakeClass), 'instanceOf'),
  };
  const FakeComponentRequired = props => <div>{props.testInstanceOf}</div>;
  FakeComponentRequired.propTypes = {
    testInstanceOf: docPropType(
      PropTypes.instanceOf(FakeClass), 'instanceOf', {
        required: true,
      }
    ),
  };
  it('documents a basic instanceOf propType', () => {
    const instanceOfPropType = docPropType(
      PropTypes.instanceOf(FakeClass), 'instanceOf'
    );

    expect(instanceOfPropType).toBeDefined();
    expect(instanceOfPropType.isRequired).toBeTruthy();
    expect(instanceOfPropType.$$reactDesc).toBeDefined();
    expect(instanceOfPropType.$$reactDesc.validate.args.name).toEqual(
      'FakeClass'
    );
    expect(instanceOfPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required instanceOf propType', () => {
    const instanceOfPropType = docPropType(
      PropTypes.instanceOf(FakeClass), 'instanceOf', {
        required: true,
      }
    );

    expect(instanceOfPropType).toBeDefined();
    expect(instanceOfPropType.isRequired).toBeFalsy();
    expect(instanceOfPropType.$$reactDesc).toBeDefined();
    expect(instanceOfPropType.$$reactDesc.validate.args.name).toEqual(
      'FakeClass'
    );
    expect(instanceOfPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated instanceOf propType', () => {
    const instanceOfPropType = docPropType(
      PropTypes.instanceOf(FakeClass), 'instanceOf', {
        deprecated: 'deprecated. use something else',
      }
    );

    expect(instanceOfPropType).toBeDefined();
    expect(instanceOfPropType.isRequired).toBeTruthy();
    expect(instanceOfPropType.$$reactDesc).toBeDefined();
    expect(instanceOfPropType.$$reactDesc.validate.args.name).toEqual(
      'FakeClass'
    );
    expect(instanceOfPropType.$$reactDesc).toMatchSnapshot();
  });

  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an instanceOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={new FakeClass()} />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with an instanceOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test="invalid" />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: Invalid prop `test` of type `String` supplied to `FakeComponent`, expected instance of `FakeClass`.\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required instanceOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: The prop `testInstanceOf` is marked as required in `FakeComponentRequired`, but its value is `undefined`.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional instanceOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});

describe('oneOf', () => {
  const elements = ['News', 'Photos'];
  const FakeComponent = props => <div>{props.test}</div>;
  FakeComponent.propTypes = {
    test: docPropType(PropTypes.oneOf(elements), 'oneOf'),
  };
  const FakeComponentRequired = props => <div>{props.testOneOf}</div>;
  FakeComponentRequired.propTypes = {
    testOneOf: docPropType(
      PropTypes.oneOf(elements), 'oneOf', {
        required: true,
      }
    ),
  };
  it('documents a basic oneOf propType', () => {
    const oneOfPropType = docPropType(
      PropTypes.oneOf(elements), 'oneOf'
    );

    expect(oneOfPropType).toBeDefined();
    expect(oneOfPropType.isRequired).toBeTruthy();
    expect(oneOfPropType.$$reactDesc).toBeDefined();
    expect(oneOfPropType.$$reactDesc.validate.args.length).toEqual(2);
    expect(oneOfPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required oneOf propType', () => {
    const oneOfPropType = docPropType(
      PropTypes.oneOf(elements), 'oneOf', {
        required: true,
      }
    );

    expect(oneOfPropType).toBeDefined();
    expect(oneOfPropType.isRequired).toBeFalsy();
    expect(oneOfPropType.$$reactDesc).toBeDefined();
    expect(oneOfPropType.$$reactDesc.validate.args.length).toEqual(2);
    expect(oneOfPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated oneOf propType', () => {
    const oneOfPropType = docPropType(
      PropTypes.oneOf(elements), 'oneOf', {
        deprecated: 'deprecated. use something else',
      }
    );

    expect(oneOfPropType).toBeDefined();
    expect(oneOfPropType.isRequired).toBeTruthy();
    expect(oneOfPropType.$$reactDesc).toBeDefined();
    expect(oneOfPropType.$$reactDesc.validate.args.length).toEqual(2);
    expect(oneOfPropType.$$reactDesc).toMatchSnapshot();
  });

  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an oneOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test="News" />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with an oneOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test="invalid" />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: Invalid prop `test` of value `invalid` supplied to `FakeComponent`, expected one of ["News","Photos"].\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required oneOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: The prop `testOneOf` is marked as required in `FakeComponentRequired`, but its value is `undefined`.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional oneOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});

describe('oneOfType', () => {
  class FakeClass {}
  const elements = [
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(FakeClass),
    (props, propName) => typeof props[propName] === 'number',
  ];
  const FakeComponent = props => <div>{props.test}</div>;
  FakeComponent.propTypes = {
    test: docPropType(PropTypes.oneOfType(elements), 'oneOfType'),
  };
  const FakeComponentRequired = props => <div>{props.testOneOfType}</div>;
  FakeComponentRequired.propTypes = {
    testOneOfType: docPropType(
      PropTypes.oneOfType(elements), 'oneOfType', {
        required: true,
      }
    ),
  };
  it('documents a basic oneOfType propType', () => {
    const oneOfTypePropType = docPropType(
      PropTypes.oneOfType(elements), 'oneOfType'
    );

    expect(oneOfTypePropType).toBeDefined();
    expect(oneOfTypePropType.isRequired).toBeTruthy();
    expect(oneOfTypePropType.$$reactDesc).toBeDefined();
    oneOfTypePropType.$$reactDesc.validate.args.forEach((arg) => {
      if (arg.type === 'instanceOf') {
        expect(arg.args.name).toEqual(
          'FakeClass'
        );
      }
      expect(arg).toMatchSnapshot();
    });
    expect(oneOfTypePropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required oneOfType propType', () => {
    const oneOfTypePropType = docPropType(
      PropTypes.oneOfType(elements), 'oneOfType', {
        required: true,
      }
    );

    expect(oneOfTypePropType).toBeDefined();
    expect(oneOfTypePropType.isRequired).toBeFalsy();
    expect(oneOfTypePropType.$$reactDesc).toBeDefined();
    expect(oneOfTypePropType.$$reactDesc.validate.args.length).toEqual(4);
    expect(oneOfTypePropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated oneOfType propType', () => {
    const oneOfTypePropType = docPropType(
      PropTypes.oneOfType(elements), 'oneOfType', {
        deprecated: 'deprecated. use something else',
      }
    );

    expect(oneOfTypePropType).toBeDefined();
    expect(oneOfTypePropType.isRequired).toBeTruthy();
    expect(oneOfTypePropType.$$reactDesc).toBeDefined();
    expect(oneOfTypePropType.$$reactDesc.validate.args.length).toEqual(4);
    expect(oneOfTypePropType.$$reactDesc).toMatchSnapshot();
  });

  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an oneOfType docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test="News" />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with an oneOfType docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={() => {}} />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: Invalid prop `test` supplied to `FakeComponent`.\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required oneOfType docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: The prop `testOneOfType` is marked as required in `FakeComponentRequired`, but its value is `undefined`.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional oneOfType docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});

describe('arrayOf', () => {
  const element = PropTypes.number;
  const FakeComponent = props => <div>{props.test}</div>;
  FakeComponent.propTypes = {
    test: docPropType(PropTypes.arrayOf(element), 'arrayOf'),
  };
  const FakeComponentRequired = props => <div>{props.testArrayOf}</div>;
  FakeComponentRequired.propTypes = {
    testArrayOf: docPropType(
      PropTypes.arrayOf(element), 'arrayOf', {
        required: true,
      }
    ),
  };
  it('documents a basic arrayOf propType', () => {
    const arrayOfPropType = docPropType(
      PropTypes.arrayOf(element), 'arrayOf'
    );

    expect(arrayOfPropType).toBeDefined();
    expect(arrayOfPropType.isRequired).toBeTruthy();
    expect(arrayOfPropType.$$reactDesc).toBeDefined();
    expect(arrayOfPropType.$$reactDesc.validate.args.type).toEqual(
      'number'
    );
    expect(arrayOfPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required arrayOf propType', () => {
    const arrayOfPropType = docPropType(
      PropTypes.arrayOf(element), 'arrayOf', {
        required: true,
      }
    );

    expect(arrayOfPropType).toBeDefined();
    expect(arrayOfPropType.isRequired).toBeFalsy();
    expect(arrayOfPropType.$$reactDesc).toBeDefined();
    expect(arrayOfPropType.$$reactDesc.validate.args.type).toEqual(
      'number'
    );
    expect(arrayOfPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated arrayOf propType', () => {
    const arrayOfPropType = docPropType(
      PropTypes.arrayOf(element), 'arrayOf', {
        deprecated: 'deprecated. use something else',
      }
    );

    expect(arrayOfPropType).toBeDefined();
    expect(arrayOfPropType.isRequired).toBeTruthy();
    expect(arrayOfPropType.$$reactDesc).toBeDefined();
    expect(arrayOfPropType.$$reactDesc.validate.args.type).toEqual(
      'number'
    );
    expect(arrayOfPropType.$$reactDesc).toMatchSnapshot();
  });

  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an arrayOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={[10]} />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with an arrayOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={() => {}} />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: Invalid prop `test` of type `function` supplied to `FakeComponent`, expected an array.\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required arrayOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: The prop `testArrayOf` is marked as required in `FakeComponentRequired`, but its value is `undefined`.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional arrayOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});

describe('objectOf', () => {
  const element = PropTypes.number;
  const FakeComponent = props => <div>{props.test}</div>;
  FakeComponent.propTypes = {
    test: docPropType(PropTypes.objectOf(element), 'objectOf'),
  };
  const FakeComponentRequired = props => <div>{props.testObjectOf}</div>;
  FakeComponentRequired.propTypes = {
    testObjectOf: docPropType(
      PropTypes.objectOf(element), 'objectOf', {
        required: true,
      }
    ),
  };
  it('documents a basic objectOf propType', () => {
    const objectOfPropType = docPropType(
      PropTypes.objectOf(element), 'objectOf'
    );

    expect(objectOfPropType).toBeDefined();
    expect(objectOfPropType.isRequired).toBeTruthy();
    expect(objectOfPropType.$$reactDesc).toBeDefined();
    expect(objectOfPropType.$$reactDesc.validate.args.type).toEqual(
      'number'
    );
    expect(objectOfPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required objectOf propType', () => {
    const objectOfPropType = docPropType(
      PropTypes.objectOf(element), 'objectOf', {
        required: true,
      }
    );

    expect(objectOfPropType).toBeDefined();
    expect(objectOfPropType.isRequired).toBeFalsy();
    expect(objectOfPropType.$$reactDesc).toBeDefined();
    expect(objectOfPropType.$$reactDesc.validate.args.type).toEqual(
      'number'
    );
    expect(objectOfPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated objectOf propType', () => {
    const objectOfPropType = docPropType(
      PropTypes.objectOf(element), 'objectOf', {
        deprecated: 'deprecated. use something else',
      }
    );

    expect(objectOfPropType).toBeDefined();
    expect(objectOfPropType.isRequired).toBeTruthy();
    expect(objectOfPropType.$$reactDesc).toBeDefined();
    expect(objectOfPropType.$$reactDesc.validate.args.type).toEqual(
      'number'
    );
    expect(objectOfPropType.$$reactDesc).toMatchSnapshot();
  });

  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an objectOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={{ test: 4 }} />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with an objectOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={{ test: 'invalid' }} />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: Invalid prop `test.test` of type `string` supplied to `FakeComponent`, expected `number`.\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required objectOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: The prop `testObjectOf` is marked as required in `FakeComponentRequired`, but its value is `undefined`.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional objectOf docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});

describe('shape', () => {
  class FakeClass {}
  const element = {
    color: PropTypes.string,
    fontSize: PropTypes.number,
    one: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(FakeClass),
      (props, propName) => typeof props[propName] === 'number',
    ]),
    test: PropTypes.instanceOf(FakeClass),
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
  const FakeComponent = props => <div>{props.test}</div>;
  FakeComponent.propTypes = {
    test: docPropType(PropTypes.shape(element), 'shape'),
  };
  const FakeComponentRequired = props => <div>{props.testShape}</div>;
  FakeComponentRequired.propTypes = {
    testShape: docPropType(
      PropTypes.shape(element), 'shape', {
        required: true,
      }
    ),
  };
  it('documents a basic shape propType', () => {
    const shapePropType = docPropType(
      PropTypes.shape(element), 'shape'
    );

    expect(shapePropType).toBeDefined();
    expect(shapePropType.isRequired).toBeTruthy();
    expect(shapePropType.$$reactDesc).toBeDefined();
    expect(shapePropType.$$reactDesc.validate.args.color.type).toEqual(
      'string'
    );
    expect(shapePropType.$$reactDesc.validate.args.fontSize.type).toEqual(
      'number'
    );
    expect(shapePropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required shape propType', () => {
    const shapePropType = docPropType(
      PropTypes.shape(element), 'shape', {
        required: true,
      }
    );

    expect(shapePropType).toBeDefined();
    expect(shapePropType.isRequired).toBeFalsy();
    expect(shapePropType.$$reactDesc).toBeDefined();
    expect(shapePropType.$$reactDesc.validate.args.color.type).toEqual(
      'string'
    );
    expect(shapePropType.$$reactDesc.validate.args.fontSize.type).toEqual(
      'number'
    );
    expect(shapePropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated shape propType', () => {
    const shapePropType = docPropType(
      PropTypes.shape(element), 'shape', {
        deprecated: 'deprecated. use something else',
      }
    );

    expect(shapePropType).toBeDefined();
    expect(shapePropType.isRequired).toBeTruthy();
    expect(shapePropType.$$reactDesc).toBeDefined();
    expect(shapePropType.$$reactDesc.validate.args.color.type).toEqual(
      'string'
    );
    expect(shapePropType.$$reactDesc.validate.args.fontSize.type).toEqual(
      'number'
    );
    expect(shapePropType.$$reactDesc).toMatchSnapshot();
  });

  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an shape docPropType', () => {
    const testArg = {
      color: 'valid',
      fontSize: 10,
      one: 10,
      test: new FakeClass(),
      test2: {
        test3: 'valid',
        test4: {
          test5: 'valid',
          test6: 10,
          test7: 10,
          test8: ['News'],
        },
      },
    };
    console.error = jest.fn();
    const test = <FakeComponent test={testArg} />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with an shape docPropType', () => {
    const testArg = {
      color: 10,
      fontSize: 10,
      one: 10,
      test: new FakeClass(),
      test2: {
        test3: 'valid',
        test4: {
          test5: 10,
          test6: 10,
          test7: 'invalid',
          test8: [10],
        },
      },
    };
    console.error = jest.fn();
    const test = <FakeComponent test={testArg} />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: Invalid prop `test.color` of type `number` supplied to `FakeComponent`, expected `string`.\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required shape docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: The prop `testShape` is marked as required in `FakeComponentRequired`, but its value is `undefined`.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional shape docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});

describe('custom', () => {
  const fakeFunc = (props, propName) => {
    if (!props[propName]) {
      return new Error('required.');
    }
    if (typeof props[propName] !== 'number') {
      return new Error('failed.');
    }
    return null;
  };
  const FakeComponent = props => <div>{props.test}</div>;
  FakeComponent.propTypes = {
    test: docPropType(fakeFunc, 'custom'),
  };
  const FakeComponentRequired = props => <div>{props.testCustom}</div>;
  FakeComponentRequired.propTypes = {
    testCustom: docPropType(
      fakeFunc, 'custom', {
        required: true,
      }
    ),
  };
  it('documents a basic custom propType', () => {
    const customPropType = docPropType(
      fakeFunc, 'custom'
    );

    expect(customPropType).toBeDefined();
    expect(customPropType.isRequired).toBeFalsy();
    expect(customPropType.$$reactDesc).toBeDefined();
    expect(customPropType.$$reactDesc.validate.name).toEqual(
      'fakeFunc'
    );
    expect(customPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a required custom propType', () => {
    const customPropType = docPropType(
      fakeFunc, 'custom', {
        required: true,
      }
    );

    expect(customPropType).toBeDefined();
    expect(customPropType.isRequired).toBeFalsy();
    expect(customPropType.$$reactDesc).toBeDefined();
    expect(customPropType.$$reactDesc.validate.name).toEqual(
      'fakeFunc'
    );
    expect(customPropType.$$reactDesc).toMatchSnapshot();
  });

  it('documents a deprecated custom propType', () => {
    const customPropType = docPropType(
      fakeFunc, 'custom', {
        deprecated: 'deprecated. use something else',
      }
    );

    expect(customPropType).toBeDefined();
    expect(customPropType.isRequired).toBeFalsy();
    expect(customPropType.$$reactDesc).toBeDefined();
    expect(customPropType.$$reactDesc.validate.name).toEqual(
      'fakeFunc'
    );
    expect(customPropType.$$reactDesc).toMatchSnapshot();
  });

  /* eslint-disable no-unused-vars, no-console */
  it('validates a component with an custom docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test={10} />;
    expect(console.error).not.toBeCalled();
  });

  it('invalidates a component with an custom docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent test="invalid" />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: failed.\n    in FakeComponent'
    );
  });

  it('invalidates a component with a required custom docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponentRequired />;
    expect(console.error).toBeCalledWith(
      'Warning: Failed prop type: required.\n    in FakeComponentRequired'
    );
  });
  it('ignores a component with an optional custom docPropType', () => {
    console.error = jest.fn();
    const test = <FakeComponent />;
    expect(console.error).not.toBeCalled();
  });
  /* eslint-enable no-unused-vars, no-console */
});
