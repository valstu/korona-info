import '../styles.css';
import { createContext } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core';

import { polyglot } from '../utils/translation';
export const UserContext = createContext<any>({ language: 'fi' });

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    heading: 'Space Grotesk Regular, sans-serif',
    body: 'Space Grotesk Regular, sans-serif',
    mono: 'Space Mono, Menlo, monospace'
  }
};

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({
  Component,
  pageProps
}: {
  Component: any;
  pageProps: any;
}) {
  const router = useRouter();
  const language = router.query.language || 'fi';
  const t = (key: string) => polyglot.t(language + '.' + key);

  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <UserContext.Provider value={{ language, t }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ThemeProvider>
  );
}
