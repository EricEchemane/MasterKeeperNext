import { Grow } from '@mui/material';
import Landing from 'components/home';
import AppHeader from 'components/home/AppHeader';
import AppTabs from 'components/home/AppTabs';
import useUserContext from 'contexts/user/user.context';
import UserAdapters from 'http/adapters/user.adapter';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { data: session } = useSession();
  const { dispatch, state: user } = useUserContext();
  const getUser = UserAdapters.Get();
  const router = useRouter();

  useEffect(() => {
    getUser.execute({})
      .then(data => {
        if (!data) {
          router.replace('/sign-up');
          return;
        }
        dispatch({
          type: 'set_user',
          payload: data.data
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user.email === '' || !session) return <Landing />;
  return <Grow in={user.email !== ''}>
    <div>
      <Head> <title> Master Keeper </title> </Head>
      <AppHeader user={user} />
      <AppTabs />
    </div>
  </Grow>;
}