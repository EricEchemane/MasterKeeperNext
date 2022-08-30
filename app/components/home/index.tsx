import { Google } from '@mui/icons-material';
import { Button, Container, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import React from 'react';

export default function Landing() {
    const isSmallDevice = useMediaQuery('(max-width:600px)');
    return <>
        <Head> <title> Master Keeper </title> </Head>
        <Container maxWidth='md'>

            <Grid container mt='2rem'>
                <Grid item xs={12} sm={6} p='1rem'>
                    <Stack alignItems={isSmallDevice ? 'center' : 'flex-start'}>
                        <Typography
                            align={isSmallDevice ? 'center' : 'left'}
                            variant="h2">
                            Master Keeper
                        </Typography>
                        <Typography variant='body1'>

                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6} p='1rem'>
                    Hello
                </Grid>
            </Grid>

            <Stack justifyContent='stretch' py='3rem'>
                <Button
                    size='large'
                    endIcon={<Google />}
                    variant="contained"
                    onClick={() => signIn('google')}>
                    Continue with Google
                </Button>
            </Stack>
        </Container>
    </>;
}
