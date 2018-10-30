import descToJSON from './descToJSON';

const code = '```';

function parseAvailableAt({ badge, url }) {
  return (
    `[![](${badge})](${url})`
  );
}

function getAvailableAt({ availableAt }) {
  if (!availableAt) {
    return '';
  }
  let availableAtStr;
  if (Array.isArray(availableAt)) {
    availableAtStr = availableAt.map(currentAvailable => parseAvailableAt(currentAvailable)).join(' ');
  } else {
    availableAtStr = parseAvailableAt(availableAt);
  }
  return `\n${availableAtStr}`;
}

function getHeader({ description, details, deprecated, name }) {
  return `## ${deprecated ? `~~${name}~~` : name}${deprecated ? ` (${deprecated})` : ''}
${description}
###### ${details || ''}
`;
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

function getDefaultValue(defaultValue) {
  const defaultValueString = typeof defaultValue === 'object' ?
    JSON.stringify(defaultValue, undefined, 2) : defaultValue;

  return ` Defaults to \`${defaultValueString}\`.`;
}

function getProperties({ properties = [] }) {
  const props = properties.map(
    ({ defaultValue, deprecated, description, format, name, required }) => (`
${deprecated ? `**~~${name}~~**` : `**${name}**`}${deprecated ? ` (${deprecated})` : ''}

${required ? 'Required. ' : ''}${description}${defaultValue ? getDefaultValue(defaultValue) : ''}

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
  const availableAt = getAvailableAt(documentation);
  const header = getHeader(documentation);
  const usage = getUsage(documentation);
  const properties = getProperties(documentation);
  return `${header}${availableAt}${usage}${properties}`;
}
