import AppHeader from 'components/home/AppHeader';
import AppTabs from 'components/home/AppTabs';
import useUserContext from 'contexts/user/user.context';
import connectToDatabase from 'db/connect-to-database';
import { IUser } from 'entities/user.entity';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Home(
  { user }: { user: IUser; }
) {
  const { dispatch } = useUserContext();
  useEffect(() => {
    dispatch({
      type: 'set_user',
      payload: user
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>
    <Head> <title> Master Keeper </title> </Head>
    <AppHeader user={user} />
    <AppTabs />
  </>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getToken({ req: context.req });

  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    };
  }
  const db = await connectToDatabase();
  if (!db) {
    return {
      redirect: {
        destination: '/500',
        permanent: false
      }
    };
  }

  const { User } = db.models;

  const user = await User.findOne({
    email: token.email
  });
  if (!user) {
    return {
      redirect: {
        destination: '/sign-up',
        permanent: false
      }
    };
  }

  return {
    props: { user: JSON.parse(JSON.stringify(user)) }
  };
};