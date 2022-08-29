import type { AppProps } from 'next/app';
import { ThemeContextProvider } from 'contexts/theme';
import { GetServerSidePropsContext } from 'next';
import { getCookie } from 'cookies-next';
import { UserProvider } from 'contexts/user/user.context';

export default function MyApp({ Component, pageProps, colorScheme }
  : AppProps & { colorScheme: 'light' | 'dark'; }) {
  return <>
    <ThemeContextProvider colorScheme={colorScheme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeContextProvider>
  </>;
}

MyApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext; }) => {
  return {
    colorScheme: getCookie('master-keeper-theme', ctx) || 'dark',
  };
};