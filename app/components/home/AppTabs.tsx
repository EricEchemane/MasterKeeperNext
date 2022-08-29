import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Container } from '@mui/material';
import useUserContext from 'contexts/user/user.context';
import NoAccountStateDisplay from './NoAccountStateDisplay';

export default function AppTabs() {
    const [value, setValue] = React.useState('1');
    const { state: user } = useUserContext();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return <>
        <Container maxWidth='md'>
            <Box sx={{ width: '100%', typography: 'body1' }} p='1rem'>

                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleChange}
                            aria-label="accounts"
                            centered>
                            <Tab label="Your accounts" value="1" />
                            <Tab label="Add account" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {user.accounts.length === 0
                            && <NoAccountStateDisplay onAdd={() => setValue('2')} />}
                    </TabPanel>
                    <TabPanel value="2">

                    </TabPanel>
                </TabContext>

            </Box>
        </Container>
    </>;
}
