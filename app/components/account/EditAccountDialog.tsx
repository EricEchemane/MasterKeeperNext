import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IAccount } from 'entities/account.entity';
import useForm from 'hooks/useForm';
import { Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import UserAdapters from 'http/adapters/user.adapter';

export default function EditAccountDialog(props: {
    open: boolean;
    close: () => void;
    account?: IAccount;
}) {
    const { handleChange, values: formValues, validate, errors } = useForm({
        account_label: props.account?.account_label || '',
        username: props.account?.username || '',
        account_url: props.account?.account_url || '',
        password: '',
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
    const editAccount = UserAdapters.EditAccount();
    const [editAccountError, setEditAccountError] = useState<any>();
    const handleClose = () => {
        props.close();
    };

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={() => { }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth='xs'
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit"}
                </DialogTitle>
                <DialogContent sx={{ width: '100%' }}>
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
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <LoadingButton
                        loading={editAccount.loading}
                        onClick={handleClose}
                        variant='contained'>
                        save
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}
