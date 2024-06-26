import React, { useEffect } from 'react';

import { IconButton } from '@storybook/components';
import { addons, types } from '@storybook/manager-api';
import { MoonIcon, SunIcon } from 'lucide-react';
import { match } from 'ts-pattern';

import { useTheme } from '../src/hooks/useTheme.js';
import theme from './theme.js';

const ExampleToolbar = React.memo(function ExampleToolbar() {
  const [theme, setTheme] = useTheme();

  useEffect(() => {
    const iframe = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement | null;
    iframe?.contentWindow?.document.documentElement.setAttribute('data-mode', theme);
  }, [theme]);

  return (
    <IconButton
      title="TailwindCSS Theme"
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }}
    >
      {match(theme)
        .with('dark', () => <SunIcon height={14} width={14} />)
        .with('light', () => <MoonIcon height={14} width={14} />)
        .exhaustive()}
    </IconButton>
  );
});

addons.setConfig({ theme });

addons.register('docs-theme', () => {
  addons.add('docs-theme-addon', {
    match: ({ viewMode }) => !!viewMode?.match(/^(story|docs)$/),
    render: ExampleToolbar,
    title: 'Addon to change docs story theme',
    type: types.TOOL
  });
});
