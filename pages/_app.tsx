import type { AppProps } from 'next/app';
import { ThemeContextProvider } from 'contexts/theme';
import { GetServerSidePropsContext } from 'next';
import { getCookie } from 'cookies-next';

export default function MyApp({ Component, pageProps, colorScheme }: AppProps & { colorScheme: 'light' | 'dark'; }) {
  return <>
    <ThemeContextProvider colorScheme={colorScheme}>
      <Component {...pageProps} />
    </ThemeContextProvider>
  </>;
}

MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext; }) => ({
  // get color scheme from cookie
  colorScheme: getCookie('master-keeper-theme', ctx) || 'dark',
});