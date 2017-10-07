import descToJSON from './descToJSON';

export default function descToMarkdown(component, reactDesc) {
  if (!component) {
    throw new Error('react-desc: component is required');
  }

  const documentation = descToJSON(component, reactDesc);
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
    properties = '\n\n### Properties\n\n| Property | Description | Format | Default Value | Required | Details |\n| ---- | ---- | ---- | ---- | ---- | ---- |';
    documentation.properties.forEach((prop) => {
      let propDeprecatedNote = '';
      let propDeprecatedContent = '';
      if (prop.deprecated) {
        propDeprecatedNote = '~~';
        propDeprecatedContent = `**Deprecated**: ${prop.deprecated}`;
      }
      properties += `\n| **${propDeprecatedNote}${prop.name}${propDeprecatedNote}** | ${prop.description} | ${prop.format.replace(/\n/g, '<br/>')} | ${prop.defaultValue || ''} | ${prop.required ? 'Yes' : 'No'} | ${propDeprecatedContent} |`;
    });
  }
  return `## ${deprecatedNote}${documentation.name}${deprecatedNote} Component${deprecatedContent}${description}${properties}`;
}
