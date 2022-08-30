import { signIn, useSession } from "next-auth/react";
import { Box, Button, Container, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import Head from "next/head";
import { Google } from "@mui/icons-material";
import useNotification from "hooks/useNotification";
import Image from "next/image";

export default function SignIn() {
    const { data: session } = useSession();
    const router = useRouter();
    const notify = useNotification();
    const isSmallDevice = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        if (session?.user) {
            notify(`Welcome ${session.user.name}!`, 'success');
            router.replace('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.user]);

    return <>
        <Head> <title>Sign in</title> </Head>
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
