import React from 'react';
import { Source, Title, Subtitle } from '@storybook/addon-docs/blocks';

import { styled } from 'storybook/theming';

type Package = {
  name: string;
  description: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

const Dependencies = styled.div({
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
  margin: '1rem 0',
});

const Dependency = styled.a({
  background: '#444',
  color: '#fff',
  display: 'inline-flex',
  textDecoration: 'none',
  fontFamily: 'monospace',
  fontSize: 12,
  borderRadius: 4,
  overflow: 'hidden',
  '& span': {
    padding: '2px 8px',
  },
  '[data-version]': {},
  '[data-package]': {
    backgroundColor: 'cornflowerblue',
    whiteSpace: 'nowrap',
  },
});

export const renderDependencies = (deps: Record<string, string>) => {
  return (
    <Dependencies>
      {Object.keys(deps).map((dep) => {
        const scope = deps[dep].replace(/\^/, '');
        return (
          <Dependency key={dep} href={`https://www.npmjs.com/package/${dep}/v/${scope}`} target="_blank">
            <span data-version>{scope}</span>
            <span data-package>{dep}</span>
          </Dependency>
        );
      })}
    </Dependencies>
  );
};

export const PackageInfo = ({ pkg }: { readonly pkg: Package }): React.ReactElement => {
  return (
    <div>
      <Title>{pkg.name}</Title>
      <a title="Published on npm" href={`https://www.npmjs.com/package/${pkg.name}`}>
        <img alt={pkg.name} src={`https://img.shields.io/npm/v/${pkg.name}.svg`} />
      </a>
      <Subtitle>{pkg.description}</Subtitle>
      <br />
      <b>Dependencies</b>
      {renderDependencies(pkg.dependencies || {})}
      {Object.keys(pkg.peerDependencies ?? {}).length ? (
        <>
          <b>Peer Dependencies</b>
          {renderDependencies(pkg.peerDependencies || {})}
        </>
      ): null}
      <b>Install</b>
      <Source language="sh" code={`npm i ${pkg.name}`} />
    </div>
  );
};
