# react-desc

[![Slack](http://alansouzati.github.io/artic/img/slack-badge.svg)](http://slackin.grommet.io)
[![Build Status](https://travis-ci.org/grommet/react-desc.svg?branch=master)](https://travis-ci.org/grommet/react-desc)
[![Code Climate](https://codeclimate.com/github/grommet/react-desc/badges/gpa.svg)](https://codeclimate.com/github/grommet/react-desc)
[![Test Coverage](https://codeclimate.com/github/grommet/react-desc/badges/coverage.svg)](https://codeclimate.com/github/grommet/react-desc/coverage)

Document your React components without the need of an AST parser

## Installation

```bash 
npm install react-desc
```

## Usage

### Adding documentation

```javascript
// Anchor.js

import React from 'react';
import { docComponent, docPropType, PropTypes } from 'react-desc';

const Anchor = (props) => {
  const { path, ...rest } = props;
  return (
    <a href={path} {...rest}>{props.children}</a>
  );
};

docComponent('A text link', Anchor);

Anchor.propTypes = {
  path: docPropType('React-router path to navigate to when clicked', PropTypes.string, {
    required: true
  }),
  href: docPropType('link location.', PropTypes.string, {
    deprecated: 'use path instead'
  }),
  id: React.PropTypes.string, // this will be ignored from the documentation
  title: docPropType('title used for accessibility.', (prop, propName) => { return ... }, {
    format: 'XXX-XX'
  }),
  target: docPropType('target link location.', PropTypes.string)
};

Anchor.defaultProps = {
  target: '_blank'
};

export default Anchor;
```

### Accessing documentation

* JSON output 

  ```javascript
    import { getDocAsJSON } from 'react-desc';
    import Anchor from './Anchor';
    
    const documentation = getDocAsJSON(Anchor);
  ```
  
  Expected output:
  
  ```json
    {
        "name": "Anchor",
        "description": "A text link",
        "properties": [
          {
            "description": "React-router path to navigate to when clicked",
            "name": "path",
            "required": true,
            "format": "string"
          },
          {
            "description": "link location.",
            "name": "href",
            "deprecated": "use path instead",
            "format": "string"
          },
          {
            "description": "title used for accessibility.",
            "name": "title",
            "format": "XXX-XX"
          },
          {
            "description": "target link location.",
            "name": "target",
            "defaultValue": "_blank",
            "format": "string"
          }
        ]
      }
  ```

* Markdown output

  ```javascript
    import { getDocAsJSON } from 'react-desc';
    import Anchor from './Anchor';
    
    const documentation = getDocAsMarkdown(Anchor);
  ```

  Expected output:
  
  ```markdown
    ## Anchor Component
    A text link

    ### Properties

    | Property | Description | Format | Default Value | Required | Details |
    | ---- | ---- | ---- | ---- | ---- | ---- |
    | **path** | React-router path to navigate to when clicked | string |  | Yes |  |
    | **~~href~~** | link location. | string |  | No | **Deprecated**: use path instead |
    | **title** | title used for accessibility. | XXX-XX |  | No |  |
    | **target** | target link location. | string | _blank | No |  |
  ```

## API

* `docComponent(description, component, options)`
  
  Documents a ReactJS component where description is a required string with an explanation about the component. 

  Options are:
  
    * **deprecated**: optional string with the deprecation message.
    
  Extra options are allowed and will be added in the JSON output inside `extras` entry. For example:
  
  ```javascript
    docComponent('A text link', Anchor, {
      usage: 'import Anchor from "grommet/components/Anchor";'
    });
  ```

* `docPropType(description, validate, options)`

   Documents a propType where description is a required explanation about the property. Validate is the PropType which is required to be an instance from `react-desc` not from `react`. The reason is that react desc project needs to augment the react PropType with the documentation for the given component that allow it to work without an AST parser.
   
   Options are:
  
    * **deprecated**: optional string with the deprecation message.
    * **required**: optional boolean that indicated with the property is required or not.
    * **format**: optional string that defines the propType format. It can be useful when used in conjuction with custom propType validation function.

* `getDocAsJSON(component)`

  Returns a JSON object with the documentation for the given component.
  
* `getDocAsMarkdown(component)`

  Returns a Markdown string with the documentation for the given component.
  
* `PropTypes`

  Wrapper around the React propTypes, all properties are supported. See all options [here](https://facebook.github.io/react/docs/typechecking-with-proptypes.html).
  
## Why not [react-docgen](https://github.com/reactjs/react-docgen)?

react-doceng is a great project but it relies on an AST parser to generate documentation. Most of the time this is ok, but for us the following use cases were hard to solve without a more verbose way to define prop types:

* Define deprecated properties
* Define required propTypes for custom function:

  ```javascript
  {
    test: () => { ... } // isRequired is not present here
  }
  ```
* Allow internal comments for properties without it showing up in the documentation

## Limitations

Comments are automatically removed by most bundling tools out there (e.g. webpack). If you use `react-desc`, your component propTypes object will be bigger and it may affect the size of your bundle. We recommend you to use [babel-plugin-transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types) to remove unnecessary propTypes from production build, which is a good idea anyways.
