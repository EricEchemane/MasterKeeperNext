import type { AppProps } from 'next/app';
import { ThemeContextProvider } from 'contexts/theme';
import { UserProvider } from 'contexts/user/user.context';
import { NotificationProvider } from 'hooks/useNotification';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <ThemeContextProvider>
      <UserProvider>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </UserProvider>
    </ThemeContextProvider>
  </>;
}