import React from 'react';

import schema from '../src/schema';

const FakeComponent = () => <div>hello</div>;

it('fails for missing component', () => {
  expect(() => {
    schema(undefined);
  }).toThrowError('schema: component is required');
});

it('fails for missing description', () => {
  expect(() => {
    schema(FakeComponent);
  }).toThrowError('schema: description is required');
});
