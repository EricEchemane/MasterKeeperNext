import type { AppProps } from 'next/app';
import { ThemeContextProvider, themeType } from 'contexts/theme';
import { UserProvider } from 'contexts/user/user.context';
import { NotificationProvider } from 'hooks/useNotification';
import { getCookie } from 'cookies-next';

export default function MyApp({ Component, pageProps, theme }: AppProps & { theme: themeType; }) {
  return <>
    <ThemeContextProvider theme={theme}>
      <UserProvider>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </UserProvider>
    </ThemeContextProvider>
  </>;
}

MyApp.getInitialProps = ({ ctx }: any) => {
  const theme = getCookie('master-keeper-theme', ctx);
  return { theme };
};