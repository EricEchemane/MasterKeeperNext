import { Button } from '@mui/material';
import useThemeContext from 'contexts/theme';
import Head from 'next/head';
import React from 'react';

export default function Home() {
  const { toggleTheme } = useThemeContext();

  return <>
    <Head> <title> Master Keeper </title> </Head>
    <Button onClick={toggleTheme}> Toggle theme </Button>
  </>;
}
