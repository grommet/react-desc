# react-desc

[![Slack](http://alansouzati.github.io/artic/img/slack-badge.svg)](http://slackin.grommet.io)
[![Build Status](https://travis-ci.org/grommet/react-desc.svg?branch=master)](https://travis-ci.org/grommet/react-desc)
[![Code Climate](https://codeclimate.com/github/grommet/react-desc/badges/gpa.svg)](https://codeclimate.com/github/grommet/react-desc)
[![Test Coverage](https://codeclimate.com/github/grommet/react-desc/badges/coverage.svg)](https://codeclimate.com/github/grommet/react-desc/coverage)

Add an schema to your React components based on React PropTypes

## Installation

```bash
npm install react-desc
```

## Usage

### Adding documentation

```javascript
// Anchor.js

import React from 'react';
import ReactPropTypes from 'prop-types';
import { describe, PropTypes } from 'react-desc';

const Anchor = (props) => {
  const { path, ...rest } = props;
  return (
    <a href={path} {...rest}>{props.children}</a>
  );
};

const AnchorWithSchema = describe(Anchor).description('A text link');

AnchorWithSchema.propTypes = {
  path: PropTypes.string.describe('React-router path to navigate to when clicked').isRequired,
  href: PropTypes.string.describe('link location').deprecated('use path instead'),
  id: ReactPropTypes.string, // this will be ignored for documentation purposes
  title: PropTypes.custom(() => {}).description('title used for accessibility').format('XXX-XX'),
  target: PropTypes.string.describe('target link location').defaultProp('_blank'),
};

export default AnchorWithSchema;
```

### Accessing documentation

* JSON output

  ```javascript
    import Anchor from './Anchor';

    const documentation = Anchor.toJSON();
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
    import Anchor from './Anchor';

    const documentation = Anchor.toMarkDown();
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

* `describe(component)`

  Creates a proxy to the actual react component with support for the following functions:

    * **description(value)**: function that receives a string with the component description.
    * **deprecated(value)**: function that receives a string with the deprecation message.
    * **toJSON()**: function that returns the component schema as a JSON object.
    * **toMarkdown()**: function that returns the component schema as a Markdown string.

* `PropTypes`

  Proxy around the React propTypes, all properties are supported. See all options [here](https://facebook.github.io/react/docs/typechecking-with-proptypes.html).
  This proxy supports the following functions:

    * **defaultProp(value)**: function that receives a value that represents the default prop.
    * **description(value)**: function that receives a string with the PropType description.
    * **deprecated(value)**: function that receives a string with the deprecation message.
    * **format(value)**: function that receives a string with the PropTypex format.

## Why not [react-docgen](https://github.com/reactjs/react-docgen)?

react-docgen is a great project but it relies on an AST parser to generate documentation. Most of the time this is ok, but for us the following use cases were hard to solve without a more verbose way to define propTypes:

* Define deprecated properties
* Define a required property for custom function:

  ```javascript
  Anchor.propTypes = {
    test: () => { ... } // isRequired is not present here
  }
  ```
* Allow internal comments for properties without it showing up in the documentation
