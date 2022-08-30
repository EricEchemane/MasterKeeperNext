import { Grow } from '@mui/material';
import AppHeader from 'components/home/AppHeader';
import AppTabs from 'components/home/AppTabs';
import Initializing from 'components/home/Initializing';
import useUserContext from 'contexts/user/user.context';
import useRequireSession from 'hooks/useRequireSession';
import UserAdapters from 'http/adapters/user.adapter';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  useRequireSession('/sign-in');
  const { dispatch, state: user } = useUserContext();
  const router = useRouter();
  const getUser = UserAdapters.Get();

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

  if (user.email === '') return <Initializing />;
  return <Grow in={user.email !== ''}>
    <div>
      <Head> <title> Master Keeper </title> </Head>
      <AppHeader user={user} />
      <AppTabs />
    </div>
  </Grow>;
}