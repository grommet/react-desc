import descToJSON from './descToJSON';

const code = '```';

function getHeader({ description, deprecated, name }) {
  return `## ${deprecated ? `~~${name}~~` : name}${deprecated ? ` (${deprecated})` : ''}
${description}\n`;
}

function getUsage({ usage }) {
  return usage ? (
    `
## Usage

${code}javascript
${usage}
${code}`
  ) : '';
}

function getDefaultProp(defaultProp) {
  const defaultPropString = typeof defaultProp === 'object' ?
    JSON.stringify(defaultProp, undefined, 2) : defaultProp;

  return ` Defaults to \`${defaultPropString}\`.`;
}

function getProperties({ properties }) {
  const props = properties.map(
    ({ defaultProp, deprecated, description, format, name, required }) => (`
${deprecated ? `**~~${name}~~**` : `**${name}**`}${deprecated ? ` (${deprecated})` : ''}

${required ? 'Required. ' : ''}${description}${defaultProp ? getDefaultProp(defaultProp) : ''}

${code}
${format}
${code}`));
  return `

## Properties
${props.join('\n')}
  `;
}

export default function descToMarkdown(component, reactDesc) {
  if (!component) {
    throw new Error('react-desc: component is required');
  }

  const documentation = descToJSON(component, reactDesc);
  const header = getHeader(documentation);
  const usage = getUsage(documentation);
  const properties = getProperties(documentation);
  return `${header}${usage}${properties}`;
}
