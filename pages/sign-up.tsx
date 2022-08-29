import { LoadingButton } from '@mui/lab';
import { Avatar, Button, Container, Stack, TextField, Typography } from '@mui/material';
import useForm from 'hooks/useForm';
import useRequireSession from 'hooks/useRequireSession';
import UserAdapters from 'http/adapters/user.adapter';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

export default function SignUp() {
    const session = useRequireSession('/sign-in');
    const [passwordNotMatch, setPasswordNotMatch] = useState(false);
    const signIn = UserAdapters.SignIn();
    const { values, handleChange } = useForm({
        masterPassword: '',
        confirmMasterPassword: '',
    });
    const save = async () => {
        if (values.masterPassword !== values.confirmMasterPassword) {
            setPasswordNotMatch(true);
            return;
        }
        const data = await signIn.execute({
            payload: {
                email: session?.user?.email || '',
                image: session?.user?.image || '',
                name: session?.user?.name || '',
                password: values.masterPassword.toString() || ''
            }
        });
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
                {signIn.error && <Typography
                    color='red'
                    fontSize='.8rem'
                    align='center'>
                    {signIn.error.message}
                </Typography>}
                <LoadingButton
                    loading={signIn.loading}
                    disabled={values.confirmMasterPassword === ''}
                    onClick={save}
                    variant='contained'>
                    save
                </LoadingButton>

            </Stack>
        </Container>
    </>;
}
