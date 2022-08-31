import type { AppProps } from 'next/app';
import { ThemeContextProvider } from 'contexts/theme';
import { UserProvider } from 'contexts/user/user.context';
import { NotificationProvider } from 'hooks/useNotification';
import { getCookie } from 'cookies-next';
import NextApp from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <ThemeContextProvider theme={pageProps.theme || 'dark'}>
      <UserProvider>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </UserProvider>
    </ThemeContextProvider>
  </>;
}

// MyApp.getInitialProps = async (appContext: any) => {
//   const appProps = await NextApp.getInitialProps(appContext);
//   const theme = getCookie('master-keeper-theme', appContext.ctx);
//   return {
//     ...appProps,
//     pageProps: {
//       ...appProps.pageProps,
//       theme
//     },
//   };
// };