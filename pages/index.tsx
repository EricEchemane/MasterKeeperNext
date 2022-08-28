import { Box, Button, Container } from '@mui/material';
import Head from 'next/head';
import React from 'react';

export default function Home() {

  return <>
    <Head> <title> Master Keeper </title> </Head>
    <Container>
      <Box p={'2rem'}>
        <Button> Toggle theme </Button>
      </Box>
    </Container>
  </>;
}
