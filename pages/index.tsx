import { Box, Button, Container } from '@mui/material';
import useThemeContext from 'contexts/theme';
import { IUser } from 'entities/user.entity';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

export default function Home(
  props: { user: IUser; }
) {
  const router = useRouter();
  const { toggleTheme } = useThemeContext();

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

  console.log(token);


  return {
    props: {}
  };
};