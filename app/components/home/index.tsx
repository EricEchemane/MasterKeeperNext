import { Google } from '@mui/icons-material';
import { Button, Container, Stack, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import React from 'react';

export default function Landing() {
    return <>
        <Head> <title> Master Keeper </title> </Head>
        <Container maxWidth='sm'>
            <Stack mt='4rem'>
                <Typography
                    variant="h2">
                    Master Keeper
                </Typography>

                <Typography mt='2rem'>
                    🔑 An encrypted account storage system.
                </Typography>
                <Typography my='1rem'>
                    🔐 Store your accounts safely and securely.
                </Typography>
                <Typography>
                    🗝️ Passwords encrypted and managed by your single master password.
                </Typography>

                <Button
                    sx={{ marginTop: '5rem' }}
                    size='large'
                    endIcon={<Google />}
                    variant="outlined"
                    onClick={() => signIn('google')}>
                    Continue with Google
                </Button>
            </Stack>
        </Container>
    </>;
}
