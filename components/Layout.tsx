import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core';
import { Children } from 'react';

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    heading: 'Space Grotesk Regular, sans-serif',
    body: 'Space Grotesk Regular, sans-serif',
    mono: 'Space Mono, Menlo, monospace'
  }
};

const Index: React.FC = props => (
  <ThemeProvider theme={customTheme}>
    <CSSReset />
    <div style={{ flex: 1 }}>{props.children}</div>
  </ThemeProvider>
);

export default Index;
