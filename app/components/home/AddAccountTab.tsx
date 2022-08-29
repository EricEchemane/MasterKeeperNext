import { LoadingButton } from '@mui/lab';
import { Container, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import GetMasterPasswordModal from './GetMasterPasswordModal';

export default function AddAccountTab() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const save = async (password: string) => {

    };
    const receivePassword = (password: string) => {
        setModalIsOpen(false);
        save(password);
    };
    const openModal = () => {
        setModalIsOpen(true);
    };

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
                <LoadingButton
                    onClick={openModal}
                    variant='contained'>
                    save
                </LoadingButton>
            </Stack>
        </Container>
        <GetMasterPasswordModal
            open={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            onPasswordSubmitted={receivePassword} />
    </>;
}
