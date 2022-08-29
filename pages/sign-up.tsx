import { Avatar, Container, Stack, TextField, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

export default function SignUp() {
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.replace('/sign-in');
        },
    });

    if (!session) return <></>;
    return <>
        <Head> <title>Sign up</title> </Head>

        <Container maxWidth='xs'>
            <Stack
                py='3rem' px='1rem'
                spacing={5}
                alignItems={'stretch'}>

                <Stack
                    spacing={1.5}
                    direction='row'
                    alignItems='center'
                    justifyContent='center'>
                    <Avatar
                        sx={{ width: 50, height: 50 }}
                        alt={session?.user?.name || 'U'}
                        src={session?.user?.image || ''} />
                    <Typography variant='h4'> Sign up </Typography>
                </Stack>

                <TextField
                    id="name"
                    label="Name"
                    defaultValue={session?.user?.name}
                    InputProps={{
                        readOnly: true,
                        fullWidth: true
                    }}
                />
                <TextField
                    id="email"
                    label="Email"
                    defaultValue={session?.user?.email}
                    InputProps={{
                        readOnly: true,
                        fullWidth: true
                    }}
                />
                <TextField
                    id="password"
                    label="Master password"
                    type="password"
                />
                <TextField
                    id="confirm-password"
                    label="Confirm master password"
                    type="password"
                />

            </Stack>
        </Container>
    </>;
}
