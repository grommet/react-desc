import docComponent from '../src/docComponent';

class FakeComponent {}

it('fails for missing component propType', () => {
  expect(() => {
    docComponent(undefined);
  }).toThrowError('docComponent: component is required');
});

it('fails for missing description propType', () => {
  expect(() => {
    docComponent(undefined, FakeComponent);
  }).toThrowError('docComponent: description is required');
});

it('documents a basic component', () => {
  docComponent('component', FakeComponent);
  expect(FakeComponent.$$reactDesc).toBeDefined();
  expect(FakeComponent.$$reactDesc).toMatchSnapshot();
});

it('documents a deprecated component', () => {
  docComponent('component', FakeComponent, {
    deprecated: 'deprecated. use something else',
  });
  expect(FakeComponent.$$reactDesc).toBeDefined();
  expect(FakeComponent.$$reactDesc).toMatchSnapshot();
});
