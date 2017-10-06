import descToJSON from './descToJSON';
import descToMarkdown from './descToMarkdown';
import PropTypes from './PropTypes';
import decorate from './decorate';

exports.PropTypes = PropTypes;
exports.decorate = decorate;
exports.descToJSON = descToJSON;
exports.descToMarkdown = descToMarkdown;
// backwards compatible
exports.schema = decorate;
exports.getDocAsJSON = descToJSON;
exports.getDocAsMarkdown = descToMarkdown;

export default {
  decorate,
  descToJSON,
  descToMarkdown,
  PropTypes,
  schema: decorate,
  getDocAsJSON: descToJSON,
  getDocAsMarkdown: descToMarkdown,
};
