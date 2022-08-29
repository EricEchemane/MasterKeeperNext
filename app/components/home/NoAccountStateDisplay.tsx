import { AddOutlined } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export default function NoAccountStateDisplay() {

    return <>
        <Stack alignItems='center' pt='2rem'>
            <Image
                width={200}
                height={200}
                alt='user accounts'
                src='/no-account.svg' />
            <Typography variant='h5' my='1rem' align='center'> No accounts stored yet </Typography>
            <Typography mb='1rem' variant='body2' align='center' sx={{ maxWidth: '450px' }}>
                {"MasterKeeper allows you to store your accounts' credentials in a secure way so you don't have to remember them all. They are ecnrypted with your master password."}
            </Typography>
            <Button endIcon={<AddOutlined />}> Add Some </Button>
        </Stack>
    </>;
}
