import { LoadingButton } from '@mui/lab';
import { Container, Stack, TextField } from '@mui/material';
import React from 'react';

export default function AddAccountTab() {
    return <>
        <Container maxWidth='xs'>
            <Stack
                py='3rem' px='1rem'
                spacing={5}
                alignItems={'stretch'}>

                <TextField label='Account label' required />
                <TextField label='Username' required />
                <TextField label='Password' required />
                <TextField label='Url or link to your account' />
                <LoadingButton variant='contained'> save </LoadingButton>
            </Stack>
        </Container>
    </>;
}
