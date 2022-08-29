import { IUser } from 'entities/user.entity';
import { Avatar, Box, Container, Divider, Stack, Typography } from '@mui/material';
import AppHeaderMenu from './AppHeaderMenu';

export default function AppHeader({ user }: { user: IUser; }) {
    return <>
        <Container>
            <Box p={'1rem'}>
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Stack direction='row' spacing={2} alignItems='center'>
                        <Avatar
                            sx={{ width: 45, height: 45 }}
                            alt={user.name}
                            src={user.image} />
                        <Stack>
                            <Typography variant='h6'> {user.name} </Typography>
                            <Typography variant='caption'> {user.email} </Typography>
                        </Stack>
                    </Stack>
                    <AppHeaderMenu />
                </Stack>
            </Box>
        </Container>
        <Divider />
    </>;
}
