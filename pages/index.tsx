import AppHeader from 'components/home/AppHeader';
import AppTabs from 'components/home/AppTabs';
import useUserContext from 'contexts/user/user.context';
import useRequireSession from 'hooks/useRequireSession';
import UserAdapters from 'http/adapters/user.adapter';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useRequireSession('/sign-in');
  const { dispatch, state: user } = useUserContext();
  const getUser = UserAdapters.Get();

  useEffect(() => {
    getUser.execute({})
      .then(data => {
        if (!data) return;
        dispatch({
          type: 'set_user',
          payload: data.data
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user.email === '') return <></>;
  return <>
    <Head> <title> Master Keeper </title> </Head>
    <AppHeader user={user} />
    <AppTabs />
  </>;
}