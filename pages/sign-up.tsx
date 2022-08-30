import { LoadingButton } from '@mui/lab';
import { Avatar, Container, Stack, TextField, Typography } from '@mui/material';
import connectToDatabase from 'db/connect-to-database';
import useForm from 'hooks/useForm';
import useNotification from 'hooks/useNotification';
import useRequireSession from 'hooks/useRequireSession';
import UserAdapters from 'http/adapters/user.adapter';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function SignUp() {
    const router = useRouter();
    const session = useRequireSession('/');
    const [passwordNotMatch, setPasswordNotMatch] = useState(false);
    const signIn = UserAdapters.SignIn();
    const notify = useNotification();
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
        if (data) {
            notify('Your are now registered', 'success');
            router.replace('/');
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = await getToken({ req: context.req });

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }
    const db = await connectToDatabase();
    if (!db) {
        return {
            redirect: {
                destination: '/500',
                permanent: false
            }
        };
    }

    const { User } = db.models;

    const user = await User.findOne({
        email: token.email
    });
    if (user) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    return {
        props: {}
    };
};