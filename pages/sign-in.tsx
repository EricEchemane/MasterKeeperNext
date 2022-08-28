import { signIn, useSession } from "next-auth/react";
import { Box, Button, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useRouter } from "next/router";

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
        <Container>
            <Box>
                <Button onClick={() => signIn('google')}> Continue with Google </Button>
            </Box>
        </Container>
    </>;
}