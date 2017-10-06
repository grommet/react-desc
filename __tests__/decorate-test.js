import React from 'react';

import decorate from '../src/decorate';

const FakeComponent = () => <div>hello</div>;

it('fails for missing component', () => {
  expect(() => {
    decorate(undefined);
  }).toThrowError('react-desc: component is required');
});

it('fails for missing description', () => {
  expect(() => {
    decorate(FakeComponent);
  }).toThrowError('react-desc: description is required');
});
