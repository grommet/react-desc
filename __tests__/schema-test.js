import React from 'react';

import schema from '../src/schema';
import PropTypes from '../src/PropTypes';

const FakeComponent = () => <div>hello</div>;

it('skips documentation for production env', () => {
  process.env.NODE_ENV = 'production';
  schema(FakeComponent, {
    description: 'A fake description',
    usage: 'fake usage',
    props: {
      fakeProp: [
        PropTypes.string,
        'Fake prop description.', {
          defaultProp: 'hi',
        },
      ],
    },
  });
  expect(FakeComponent.$$reactDesc).toBeUndefined();
  expect(FakeComponent.propTypes).toBeUndefined();
  expect(JSON.stringify(FakeComponent.defaultProps)).toEqual('{"fakeProp":"hi"}');
  process.env.NODE_ENV = 'test';
});
