import { LoadingButton } from '@mui/lab';
import { Container, Stack, TextField } from '@mui/material';
import useForm from 'hooks/useForm';
import UserAdapters from 'http/adapters/user.adapter';
import React, { useState } from 'react';
import GetMasterPasswordModal from './GetMasterPasswordModal';

export default function AddAccountTab() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { handleChange, values: formValues } = useForm({
        account_label: '',
        username: '',
        password: '',
        account_url: ''
    });
    const addAccount = UserAdapters.AddAccount();

    const save = async (password: string) => {
        // validate fields first
        const data = await addAccount.execute({
            payload: {
                master_password: password,
                account_label: formValues.account_label,
                account_url: formValues.account_url,
                password: formValues.password,
                username: formValues.username,
            }
        });
        console.log(data);
    };
    const receivePassword = (password: string) => {
        setModalIsOpen(false);
        save(password);
    };
    const openModal = () => {
        setModalIsOpen(true);
    };

    return <>
        <Container maxWidth='xs' style={{ padding: 0 }}>
            <Stack
                py='3rem'
                spacing={5}
                alignItems={'stretch'}>

                <TextField
                    name='account_label'
                    value={formValues.account_label}
                    onChange={handleChange}
                    label='Account label' required />
                <TextField
                    name='username'
                    value={formValues.username}
                    onChange={handleChange}
                    label='Username' required />
                <TextField
                    name='password'
                    value={formValues.password}
                    onChange={handleChange}
                    label='Password' required />
                <TextField
                    name='account_url'
                    value={formValues.account_url}
                    onChange={handleChange}
                    label='Url or link to your account' />
                <LoadingButton
                    loading={addAccount.loading}
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
