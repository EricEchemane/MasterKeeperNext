import { Avatar, Button, Container, Stack, TextField, Typography } from '@mui/material';
import useForm from 'hooks/useForm';
import useRequireSession from 'hooks/useRequireSession';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

export default function SignUp() {
    const session = useRequireSession('/sign-in');
    const [passwordNotMatch, setPasswordNotMatch] = useState(false);
    const { values, handleChange } = useForm({
        masterPassword: '',
        confirmMasterPassword: '',
    });
    const save = () => {
        if (values.masterPassword !== values.confirmMasterPassword) {
            setPasswordNotMatch(true);
        }
    };
    useEffect(() => {
        setPasswordNotMatch(false);
    }, [values]);

    if (!session) return <Head> <title>Sign up</title> </Head>;
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
                    name="masterPassword"
                    label="Master password"
                    type="password"
                    value={values.masterPassword}
                    onChange={handleChange}
                />
                <TextField
                    name="confirmMasterPassword"
                    label="Confirm master password"
                    type="password"
                    value={values.confirmMasterPassword}
                    error={passwordNotMatch}
                    helperText={passwordNotMatch ? "Password don't match" : ''}
                    onChange={handleChange}
                />
                <Button
                    onClick={save}
                    variant='contained'>
                    save
                </Button>

            </Stack>
        </Container>
    </>;
}
