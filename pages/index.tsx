import { Box, Button, Container } from '@mui/material';
import useThemeContext from 'contexts/theme';
import connectToDatabase from 'db/connect-to-database';
import { IUser } from 'entities/user.entity';
import useRequireSession from 'hooks/useRequireSession';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import Head from 'next/head';
import React from 'react';

export default function Home(
  props: { user: IUser; }
) {
  const { toggleTheme } = useThemeContext();
  useRequireSession('/sign-in');

  return <>
    <Head> <title> Master Keeper </title> </Head>
    <Container>
      <Box p={'2rem'}>
        <Button onClick={toggleTheme}> Toggle theme </Button>
      </Box>
    </Container>
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
    props: { user }
  };
};