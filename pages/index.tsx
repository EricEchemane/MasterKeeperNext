import { Box, Button, Container } from '@mui/material';
import useThemeContext from 'contexts/theme';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

export default function Home() {
  const router = useRouter();
  const { toggleTheme } = useThemeContext();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/sign-in');
    },
  });

  return <>
    <Head> <title> Master Keeper </title> </Head>
    <Container>
      <Box p={'2rem'}>
        <Button onClick={toggleTheme}> Toggle theme </Button>
      </Box>
    </Container>
  </>;
}
