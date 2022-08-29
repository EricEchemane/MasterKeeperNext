import { signIn, useSession } from "next-auth/react";
import { Box, Button, Container, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import Head from "next/head";
import { Google } from "@mui/icons-material";

export default function SignIn() {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session?.user) {
            router.replace('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.user]);

    return <>
        <Head> <title>Sign in</title> </Head>
        <Container maxWidth='xs'>
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
