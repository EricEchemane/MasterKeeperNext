import { OpenInNewOutlined } from '@mui/icons-material';
import { Box, Button, Card, Stack, Typography, useMediaQuery } from '@mui/material';
import { IAccount } from 'entities/account.entity';
import React from 'react';
import AccountMenu from './AccountMenu';

export default function AccountsTab({ accounts }: { accounts: IAccount[]; }) {
    const isSmallDevice = useMediaQuery('(max-width:600px)');
    return <>
        <Stack spacing={2}>
            {accounts.map(account => (
                <Card key={account._id}>
                    <Box p='1rem'>
                        <Stack direction='row' alignItems='flex-start' justifyContent='space-between'>
                            <Stack
                                flexWrap='wrap'
                                spacing={2}
                                direction={isSmallDevice ? 'column' : 'row'}
                                pl={1} pt={1}>

                                <Stack direction='row' alignItems='center'>
                                    <Typography variant='body2' mr={1}> username: </Typography>
                                    <Typography> {account.username} </Typography>
                                </Stack>
                                <Stack direction='row' alignItems='center'>
                                    <Typography variant='body2' mr={1}> password: </Typography>
                                    <Button size='small'> decrypt </Button>
                                </Stack>
                                {account.account_url.startsWith('http')
                                    ? <Button
                                        variant='outlined'
                                        href={account.account_url}
                                        target='_blank'
                                        endIcon={<OpenInNewOutlined />}>
                                        {account.account_label}
                                    </Button>
                                    : <Button variant='outlined'> {account.account_label} </Button>}
                            </Stack>
                            <AccountMenu account={account} />
                        </Stack>
                    </Box>
                </Card>
            ))}
        </Stack>
    </>;
}
