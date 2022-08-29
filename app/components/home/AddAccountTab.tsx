import { LoadingButton } from '@mui/lab';
import { Container, Stack, TextField, Typography } from '@mui/material';
import useForm from 'hooks/useForm';
import useNotification from 'hooks/useNotification';
import UserAdapters from 'http/adapters/user.adapter';
import React, { useState } from 'react';
import GetMasterPasswordModal from './GetMasterPasswordModal';

export default function AddAccountTab(props: {
    onChangeTab: (tab: string) => void;
}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { handleChange, values: formValues, validate, errors } = useForm({
        account_label: '',
        username: '',
        password: '',
        account_url: ''
    }, {
        account_label: value => {
            if (value.length < 3) return 'account label should not be less than 3 characters';
        },
        username: value => {
            if (value.trim().length === 0) return 'username is required';
        },
        password: value => {
            if (value.trim().length === 0) return 'password is required';
        },
    });
    const addAccount = UserAdapters.AddAccount();
    const notify = useNotification();

    const save = async (password: string) => {
        setModalIsOpen(false);

        const errors = validate();
        if (errors) return;

        const data = await addAccount.execute({
            payload: {
                master_password: password,
                account_label: formValues.account_label,
                account_url: formValues.account_url,
                password: formValues.password,
                username: formValues.username,
            }
        });
        if (data) {
            props.onChangeTab('1');
            notify('Added successfully', 'success');
        }
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
                    error={errors?.account_label}
                    helperText={errors?.account_label}
                    name='account_label'
                    value={formValues.account_label}
                    onChange={handleChange}
                    label='Account label' required />
                <TextField
                    error={errors?.username}
                    helperText={errors?.username}
                    name='username'
                    value={formValues.username}
                    onChange={handleChange}
                    label='Username' required />
                <TextField
                    error={errors?.password}
                    helperText={errors?.password}
                    name='password'
                    value={formValues.password}
                    onChange={handleChange}
                    label='Password' required />
                <TextField
                    name='account_url'
                    value={formValues.account_url}
                    onChange={handleChange}
                    label='Url or link to your account' />
                {addAccount.error && <Typography
                    color='red'
                    fontSize='.8rem'
                    align='center'>
                    {addAccount.error.message}
                </Typography>}
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
            onPasswordSubmitted={save} />
    </>;
}
