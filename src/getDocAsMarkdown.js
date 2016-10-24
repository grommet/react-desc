import getDocAsJSON from './getDocAsJSON';

export default function getDocAsMarkdown(component) {
  if (!component) {
    throw new Error('getDocAsMarkdown: component is required');
  }

  const documentation = getDocAsJSON(component);
  let description = '';
  if (documentation.description) {
    description = `\n${documentation.description}`;
  }
  let deprecatedNote = '';
  let deprecatedContent = '';
  if (documentation.deprecated) {
    deprecatedNote = '~~';
    deprecatedContent = `\n### Deprecated: ${documentation.deprecated}`;
  }
  let properties = '';
  if (documentation.properties) {
    properties = `\n\n### Properties\n\n| Property | Description | Format | Default Value | Required | Details |\n| ---- | ---- | ---- | ---- | ---- | ---- |`;
    documentation.properties.forEach((prop) => {
      let propDeprecatedNote = '';
      let propDeprecatedContent = '';
      if (prop.deprecated) {
        propDeprecatedNote = '~~';
        propDeprecatedContent = `**Deprecated**: ${prop.deprecated}`;
      }
      properties += `\n| **${propDeprecatedNote}${prop.name}${propDeprecatedNote}** | ${prop.description} | ${prop.format} | ${prop.defaultValue || ''} | ${prop.required ? 'Yes' : 'No'} | ${propDeprecatedContent} |`;
    });
  }
  return `## ${deprecatedNote}${documentation.name}${deprecatedNote} Component${deprecatedContent}${description}${properties}`;
}
