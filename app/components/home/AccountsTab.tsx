import { MoreHoriz, OpenInNewOutlined } from '@mui/icons-material';
import { Box, Button, Card, Divider, IconButton, Link, Stack, Typography } from '@mui/material';
import { IAccount } from 'entities/account.entity';
import React from 'react';

export default function AccountsTab({ accounts }: { accounts: IAccount[]; }) {
    return <>
        <Stack spacing={2}>
            {accounts.map(account => (
                <Card key={account._id}>
                    <Box p='1rem'>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            {account.account_url.startsWith('http')
                                ? <Button
                                    href={account.account_url}
                                    target='_blank'
                                    endIcon={<OpenInNewOutlined />}>
                                    {account.account_label}
                                </Button>
                                : <Button> {account.account_label} </Button>}
                            <IconButton>
                                <MoreHoriz />
                            </IconButton>
                        </Stack>
                    </Box>
                </Card>
            ))}
        </Stack>
    </>;
}
